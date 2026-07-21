import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import {
  buildScopeKey,
  enforceFallbackRateLimit,
  fetchIpUsageSnapshot,
  fetchUsageSnapshot,
  logUsageEvent,
  type FallbackRateState,
} from '@/lib/ai-usage'
import { getCensusContextForPrompt } from '@/lib/census'
import { sanitizeForLog, sanitizeTextForLog } from '@/lib/security/redact-secrets'
import { jsonError, getRequesterIp, estimateTokens, extractOutputText, enforceAiBan } from '@/lib/ai-guard'

export const runtime = 'nodejs'

// OpenAI Responses API expects provider-native model IDs.
// OpenClaw alias `openai-codex/gpt-5.3-instant` maps to `gpt-5.3-instant` here.
const CHAT_MODEL = 'gpt-5.3-instant'
const ROUTE_KEY = 'planner-chat'
const MAX_CONTEXT_MESSAGES = 16
const MAX_MESSAGE_CHARS = 4000
const MAX_TOTAL_INPUT_CHARS = 24000
const MAX_OUTPUT_TOKENS = 1800

const GUEST_GRACE_MS = 10 * 60 * 1000
const GUEST_MAX_REQUESTS_PER_HOUR = 60
const GUEST_MIN_INTERVAL_MS = 1200
// Guests can mint a fresh visitorId (and with it a fresh scope) at will, so
// the IP-level cap is what actually bounds anonymous platform-key spend.
// Above the per-visitor cap to tolerate shared networks (offices, libraries).
const GUEST_IP_MAX_REQUESTS_PER_HOUR = 90

const MEMBER_MAX_REQUESTS_PER_HOUR = 180
const MEMBER_MIN_INTERVAL_MS = 400

const OPENAI_TIMEOUT_MS = 45_000

const SYSTEM_PROMPT = `You are a senior U.S. urban and transportation planner with deep expertise in implementation for small towns, tribes, counties, RTPAs, transportation commissions, and state transportation agencies.

Operating style:
- Practical, concrete, and decision-grade (no generic fluff).
- Lead with a concise recommendation, then unpack tradeoffs.
- Highlight risk, timeline pressure, match constraints, and staffing implications.
- If assumptions are required, label them explicitly.

Preferred response format (when appropriate):
1) Quick take
2) Why this works (or where it breaks)
3) Execution steps (30/60/90-day style when useful)
4) Risks + mitigation
5) Optional: grant/funding angle

Domain focus:
- ATP, RTP, HSIP, CRP, SS4A, RAISE, PROTECT, FTA transit capital programs.
- Corridor safety, school access, complete streets, VMT framing, and grant competitiveness.
- Small agency realities: limited staff capacity, matching-fund pressure, phased delivery, and board/public communication.
- Tribal coordination realities, federal/state alignment, and interagency delivery constraints.
- Handle county-equivalent terminology correctly (e.g., parishes, boroughs, independent cities, municipios).

Safety and scope:
- Do not invent data, statutes, or citations.
- If Census figures are used, include dataset + vintage in plain language.
- If uncertain, state uncertainty clearly.
- This is planning support, not legal advice.`

const preferenceSchema = z
  .object({
    geographyFocus: z.enum(['small-town-rural-us', 'tribal-governments', 'state-regional-agencies', 'mixed-us']).optional(),
    responseStyle: z.enum(['quick-take', 'deep-dive', 'board-memo']).optional(),
  })
  .optional()

const requestSchema = z.object({
  visitorId: z.string().trim().max(120).optional(),
  preferences: preferenceSchema,
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
      })
    )
    .min(1)
    .max(MAX_CONTEXT_MESSAGES),
})

type PlannerStateStore = Map<string, FallbackRateState>

declare global {
  var __plannerChatState: PlannerStateStore | undefined
}

function getStateStore(): PlannerStateStore {
  if (!globalThis.__plannerChatState) {
    globalThis.__plannerChatState = new Map<string, FallbackRateState>()
  }
  return globalThis.__plannerChatState
}

function buildPreferenceInstruction(preferences?: z.infer<typeof preferenceSchema>): string {
  const geographyMap = {
    'small-town-rural-us': 'Prioritize small-town and rural U.S. operating realities by default.',
    'tribal-governments': 'Prioritize tribal transportation realities, sovereignty-aware coordination, and culturally responsive implementation by default.',
    'state-regional-agencies': 'Prioritize state DOT, RTPA, and transportation commission coordination and delivery constraints by default.',
    'mixed-us': 'Blend U.S. small-town, tribal, county, regional, and state-agency context as needed.',
  } as const

  const responseStyleMap = {
    'quick-take': 'Keep responses concise and highly actionable unless user asks for more depth.',
    'deep-dive': 'Provide deeper analysis, alternatives, and step-by-step implementation detail.',
    'board-memo': 'Format responses in a board-memo style with crisp headings and decision language.',
  } as const

  const geography = preferences?.geographyFocus
    ? geographyMap[preferences.geographyFocus]
    : 'Use mixed U.S. small-town, tribal, county, regional, and state-agency context when relevant.'
  const style = preferences?.responseStyle
    ? responseStyleMap[preferences.responseStyle]
    : 'Use balanced depth: concise first, then detail.'

  return `User preference guidance:\n- ${geography}\n- ${style}`
}

export async function POST(req: NextRequest) {
  let admin = getSupabaseAdminClient()

  try {
    const parsed = requestSchema.safeParse(await req.json())
    if (!parsed.success) {
      return jsonError('Invalid chat payload.', 400)
    }

    const { visitorId, messages, preferences } = parsed.data
    const userMessages = messages.filter((message) => message.role === 'user').slice(-MAX_CONTEXT_MESSAGES)

    if (userMessages.length === 0) {
      return jsonError('Please send a user message before requesting a response.', 400)
    }

    const inputChars = userMessages.reduce((sum, message) => sum + message.content.length, 0)

    if (inputChars > MAX_TOTAL_INPUT_CHARS) {
      return jsonError('Your message history is too long. Please start a new thread.', 413)
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const userId = user?.id ?? null

    const now = Date.now()
    const ip = getRequesterIp(req)
    const scopeKey = buildScopeKey(userId, visitorId, ip)
    const requesterKind = user ? 'member' : 'guest'
    const userProvidedApiKey = req.headers.get('x-user-openai-key')?.trim() || null
    const keySource = userProvidedApiKey ? 'user_provided' : 'platform'

    const maxPerHour = user ? MEMBER_MAX_REQUESTS_PER_HOUR : GUEST_MAX_REQUESTS_PER_HOUR
    const minIntervalMs = user ? MEMBER_MIN_INTERVAL_MS : GUEST_MIN_INTERVAL_MS

    let guestExpiresAt: number | null = null

    const banResponse = await enforceAiBan(admin, {
      routeKey: ROUTE_KEY,
      scopeKey,
      requesterKind,
      userId,
      visitorId: visitorId ?? null,
      ip,
      keySource,
    })
    if (banResponse) return banResponse

    // Guest grace remains in-memory to keep UX consistent even if usage events table is unavailable.
    if (!user) {
      const stateStore = getStateStore()
      const state =
        stateStore.get(scopeKey) ||
        ({
          firstSeenAt: now,
          lastRequestAt: 0,
          requests: [],
        } satisfies FallbackRateState)
      stateStore.set(scopeKey, state)
      guestExpiresAt = state.firstSeenAt + GUEST_GRACE_MS

      if (now - state.firstSeenAt > GUEST_GRACE_MS) {
        if (admin) {
          try {
            await logUsageEvent(admin, {
              scopeKey,
              route: ROUTE_KEY,
              requesterKind,
              userId,
              visitorId: visitorId ?? null,
              ip,
              status: 'guest_expired',
              metadata: { reason: 'guest_grace_expired', key_source: keySource },
            })
          } catch {
            admin = null
          }
        }

        return jsonError('Signup required to continue this chat.', 401, {
          requiresSignup: true,
          guestExpiresAt,
        })
      }

      if (!admin) {
        const fallbackRateError = enforceFallbackRateLimit(state, now, maxPerHour, minIntervalMs)
        if (fallbackRateError) {
          return jsonError(fallbackRateError, 429)
        }
      }
    }

    if (admin) {
      try {
        const [snapshot, ipSnapshot] = await Promise.all([
          fetchUsageSnapshot(admin, scopeKey, ROUTE_KEY, now),
          !user ? fetchIpUsageSnapshot(admin, ip, ROUTE_KEY, now) : Promise.resolve(null),
        ])

        if (ipSnapshot && ipSnapshot.requestsLastHour >= GUEST_IP_MAX_REQUESTS_PER_HOUR) {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId,
            visitorId: visitorId ?? null,
            ip,
            status: 'rate_limited',
            metadata: { reason: 'ip_hourly_limit', key_source: keySource },
          })
          return jsonError(
            'Guest usage from this network has hit its hourly limit. Create a free account to continue.',
            429
          )
        }

        if (snapshot.lastRequestAtMs && now - snapshot.lastRequestAtMs < minIntervalMs) {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId,
            visitorId: visitorId ?? null,
            ip,
            status: 'rate_limited',
            metadata: { reason: 'min_interval', key_source: keySource },
          })
          return jsonError('You are sending messages too quickly. Please wait a moment.', 429)
        }

        if (snapshot.requestsLastHour >= maxPerHour) {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId,
            visitorId: visitorId ?? null,
            ip,
            status: 'rate_limited',
            metadata: { reason: 'hourly_limit', key_source: keySource },
          })
          return jsonError('You have hit the hourly message limit. Please try again shortly.', 429)
        }
      } catch (usageError) {
        console.error('Planner usage snapshot failed; falling back to in-memory limits', sanitizeForLog(usageError))
        // Fail toward the in-memory limiter rather than proceeding with no
        // limit at all — this path previously called OpenAI unmetered.
        const stateStore = getStateStore()
        const state =
          stateStore.get(scopeKey) ||
          ({
            firstSeenAt: now,
            lastRequestAt: 0,
            requests: [],
          } satisfies FallbackRateState)
        stateStore.set(scopeKey, state)

        const fallbackRateError = enforceFallbackRateLimit(state, now, maxPerHour, minIntervalMs)
        if (fallbackRateError) {
          return jsonError(fallbackRateError, 429)
        }
        admin = null
      }
    }

    const apiKey = userProvidedApiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      return jsonError('Chat API is not configured yet.', 503)
    }

    const preferenceInstruction = buildPreferenceInstruction(preferences)
    const latestUserMessage = userMessages[userMessages.length - 1]?.content ?? ''
    const censusContext = await getCensusContextForPrompt(latestUserMessage)

    const estimatedInputTokens = estimateTokens(
      `${preferenceInstruction}\n\n${censusContext.promptBlock || ''}\n\n${userMessages
        .map((message) => message.content)
        .join('\n\n')}`
    )

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort('openai_timeout'), OPENAI_TIMEOUT_MS)

    let openAiResponse: Response
    try {
      openAiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_output_tokens: MAX_OUTPUT_TOKENS,
        input: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'system',
            content: preferenceInstruction,
          },
          ...(censusContext.promptBlock
            ? [
                {
                  role: 'system' as const,
                  content: censusContext.promptBlock,
                },
              ]
            : []),
          ...userMessages.map((message) => ({
            role: 'user',
            content: message.content,
          })),
        ],
      }),
      })
    } catch (fetchError) {
      const isTimeout = controller.signal.aborted
      console.error('Planner chat upstream fetch failed', sanitizeForLog({ isTimeout, error: fetchError }))
      return jsonError(
        isTimeout
          ? 'The planning copilot timed out. Please retry in a moment.'
          : 'We couldn\'t reach the AI service. Please retry in a moment.',
        isTimeout ? 504 : 502
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!openAiResponse.ok) {
      const details = await openAiResponse.text()
      console.error('Planner chat upstream error',
        sanitizeForLog({
          status: openAiResponse.status,
          details: sanitizeTextForLog(details),
        })
      )

      if (admin) {
        try {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId,
            visitorId: visitorId ?? null,
            ip,
            inputTokens: estimatedInputTokens,
            outputTokens: 0,
            status: 'upstream_error',
            metadata: { status: openAiResponse.status, key_source: keySource },
          })
        } catch (logError) {
          console.error('Planner usage log failed (upstream error)', sanitizeForLog(logError))
        }
      }

      return jsonError('We couldn\'t generate a response right now. Please retry in 30 seconds.', 502)
    }

    const payload = (await openAiResponse.json()) as unknown
    const reply = extractOutputText(payload)

    if (!reply) {
      return jsonError('No response generated. Please try again.', 502)
    }

    const outputTokens = estimateTokens(reply)

    if (admin) {
      try {
        await logUsageEvent(admin, {
          scopeKey,
          route: ROUTE_KEY,
          requesterKind,
          userId,
          visitorId: visitorId ?? null,
          ip,
          inputTokens: estimatedInputTokens,
          outputTokens,
          status: 'completed',
          metadata: {
            model: CHAT_MODEL,
            messageCount: userMessages.length,
            key_source: keySource,
          },
        })
      } catch (logError) {
        console.error('Planner usage log failed (completed)', sanitizeForLog(logError))
      }
    }

    return NextResponse.json({
      ok: true,
      reply,
      model: CHAT_MODEL,
      guestExpiresAt: !user ? guestExpiresAt : null,
      sources: censusContext.sources,
    })
  } catch (error) {
    console.error('Planner chat route error', sanitizeForLog(error))
    return jsonError('Unexpected server error.', 500)
  }
}
