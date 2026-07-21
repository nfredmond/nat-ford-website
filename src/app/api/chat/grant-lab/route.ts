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
import { sanitizeForLog, sanitizeTextForLog } from '@/lib/security/redact-secrets'
import { jsonError, getRequesterIp, estimateTokens, extractOutputText, enforceAiBan } from '@/lib/ai-guard'

export const runtime = 'nodejs'

// OpenAI Responses API expects provider-native model IDs.
// OpenClaw alias `openai-codex/gpt-5.3-instant` maps to `gpt-5.3-instant` here.
const CHAT_MODEL = 'gpt-5.3-instant'
const ROUTE_KEY = 'grant-lab'
const MAX_CONTEXT_MESSAGES = 20
const MAX_MESSAGE_CHARS = 5000
const MAX_TOTAL_INPUT_CHARS = 32000
const MAX_OUTPUT_TOKENS_GUEST = 1400
const MAX_OUTPUT_TOKENS_MEMBER = 2200

const GUEST_MAX_REQUESTS_PER_HOUR = 45
const MEMBER_MAX_REQUESTS_PER_HOUR = 120
const GUEST_MIN_INTERVAL_MS = 1200
const MEMBER_MIN_INTERVAL_MS = 350

const GUEST_DAILY_TOKEN_BUDGET = 45000
const MEMBER_DAILY_TOKEN_BUDGET = 120000
// Guests can mint a fresh visitorId (and with it a fresh scope + budget) at
// will, so the IP-level caps are what actually bound anonymous platform-key
// spend. Set above the per-visitor limits to tolerate shared networks.
const GUEST_IP_MAX_REQUESTS_PER_HOUR = 70
const GUEST_IP_DAILY_TOKEN_BUDGET = 90000
const OPENAI_TIMEOUT_MS = 45000

type GrantLabStateStore = Map<string, FallbackRateState>

declare global {
  var __grantLabChatState: GrantLabStateStore | undefined
}

function getStateStore(): GrantLabStateStore {
  if (!globalThis.__grantLabChatState) {
    globalThis.__grantLabChatState = new Map<string, FallbackRateState>()
  }
  return globalThis.__grantLabChatState
}

const SYSTEM_PROMPT = `You are a senior U.S. transportation + land use grant strategist.

Your job:
- Help users draft strong, realistic, program-specific grant application narrative text.
- Ask for missing details when needed, but still provide a useful draft when details are partial.
- Make content practical for small-town and rural agencies, tribal governments, counties (and county-equivalents like parishes/boroughs/municipios), RTPAs, transportation commissions, MPOs, and state transportation agencies.

Output requirements:
- Write in plain English with specific implementation language.
- Include clear assumptions when details are missing.
- Be honest about risk, match constraints, delivery readiness, and schedule dependencies.
- Avoid fabricated statutes, fake citations, or invented numbers.
- When revising a prior draft, preserve good material and show what changed.
- Respect requested tone, section focus, and target word count when provided.

Default structure for first draft:
1) Problem Statement
2) Project Overview
3) Community Need + Equity/Safety
4) Deliverability + Readiness
5) Funding + Match Strategy
6) Expected Outcomes + Evaluation
7) Why this proposal is competitive now`

const grantContextSchema = z.object({
  grantProgram: z.string().trim().min(1).max(120),
  applicantName: z.string().trim().max(160).optional(),
  location: z.string().trim().max(180).optional(),
  applicantType: z.string().trim().max(120).optional(),
  projectName: z.string().trim().max(180).optional(),
  fundingNeed: z.string().trim().max(180).optional(),
  localMatch: z.string().trim().max(180).optional(),
  goals: z.string().trim().max(1600).optional(),
  scope: z.string().trim().max(2200).optional(),
  equitySafetyNeed: z.string().trim().max(1600).optional(),
  readiness: z.string().trim().max(1200).optional(),
  risks: z.string().trim().max(1200).optional(),
  extraNotes: z.string().trim().max(1200).optional(),
  scoringPriorities: z.string().trim().max(1200).optional(),
  tone: z.enum(['balanced', 'technical', 'executive']).optional(),
  targetWordCount: z.coerce.number().int().min(150).max(1800).optional(),
  sectionFocus: z.string().trim().max(240).optional(),
})

const requestSchema = z.object({
  visitorId: z.string().trim().max(120).optional(),
  mode: z.enum(['draft', 'chat']).default('chat'),
  context: grantContextSchema,
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

function formatGrantContext(context: z.infer<typeof grantContextSchema>): string {
  const lines = [
    `Grant Program: ${context.grantProgram}`,
    `Applicant Name: ${context.applicantName || 'Not provided'}`,
    `Location: ${context.location || 'Not provided'}`,
    `Applicant Type: ${context.applicantType || 'Not provided'}`,
    `Project Name: ${context.projectName || 'Not provided'}`,
    `Funding Need: ${context.fundingNeed || 'Not provided'}`,
    `Local Match Capacity: ${context.localMatch || 'Not provided'}`,
    `Project Goals: ${context.goals || 'Not provided'}`,
    `Project Scope: ${context.scope || 'Not provided'}`,
    `Equity + Safety Need: ${context.equitySafetyNeed || 'Not provided'}`,
    `Readiness + Delivery Status: ${context.readiness || 'Not provided'}`,
    `Known Risks / Constraints: ${context.risks || 'Not provided'}`,
    `Extra Notes: ${context.extraNotes || 'Not provided'}`,
    `Scoring Priorities: ${context.scoringPriorities || 'Not provided'}`,
    `Preferred Tone: ${context.tone || 'balanced'}`,
    `Target Word Count: ${context.targetWordCount || 'Not specified'}`,
    `Section Focus: ${context.sectionFocus || 'Full narrative'}`,
  ]

  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  let admin = getSupabaseAdminClient()

  try {
    const parsed = requestSchema.safeParse(await req.json())
    if (!parsed.success) {
      return jsonError('Invalid grant lab payload.', 400)
    }

    const { visitorId, mode, context, messages } = parsed.data
    const userMessages = messages.filter((message) => message.role === 'user').slice(-MAX_CONTEXT_MESSAGES)

    if (userMessages.length === 0) {
      return jsonError('Please send at least one user message.', 400)
    }

    // In revision mode the model is asked to "preserve strong material and
    // apply requested edits" — it needs the draft it is revising.
    const latestDraft =
      mode === 'chat'
        ? [...messages].reverse().find((message) => message.role === 'assistant')?.content ?? null
        : null

    const contextText = formatGrantContext(context)
    const messageText = userMessages.map((message) => `[user] ${message.content}`).join('\n\n')
    const totalChars = contextText.length + messageText.length + (latestDraft?.length ?? 0)

    if (totalChars > MAX_TOTAL_INPUT_CHARS) {
      return jsonError('This thread is too long. Start a fresh thread or shorten the context.', 413)
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const now = Date.now()
    const ip = getRequesterIp(req)
    const scopeKey = buildScopeKey(user?.id, visitorId, ip)
    const requesterKind = user ? 'member' : 'guest'
    const userProvidedApiKey = req.headers.get('x-user-openai-key')?.trim() || null
    const keySource = userProvidedApiKey ? 'user_provided' : 'platform'

    const maxPerHour = user ? MEMBER_MAX_REQUESTS_PER_HOUR : GUEST_MAX_REQUESTS_PER_HOUR
    const minIntervalMs = user ? MEMBER_MIN_INTERVAL_MS : GUEST_MIN_INTERVAL_MS
    const budgetCap = user ? MEMBER_DAILY_TOKEN_BUDGET : GUEST_DAILY_TOKEN_BUDGET

    let tokensUsed24h = 0

    const banResponse = await enforceAiBan(admin, {
      routeKey: ROUTE_KEY,
      scopeKey,
      requesterKind,
      userId: user?.id,
      visitorId: visitorId ?? null,
      ip,
      keySource,
    })
    if (banResponse) return banResponse

    if (admin) {
      try {
        const [snapshot, ipSnapshot] = await Promise.all([
          fetchUsageSnapshot(admin, scopeKey, ROUTE_KEY, now),
          !user ? fetchIpUsageSnapshot(admin, ip, ROUTE_KEY, now) : Promise.resolve(null),
        ])
        tokensUsed24h = snapshot.tokensUsed24h

        if (
          ipSnapshot &&
          (ipSnapshot.requestsLastHour >= GUEST_IP_MAX_REQUESTS_PER_HOUR ||
            ipSnapshot.tokensUsed24h >= GUEST_IP_DAILY_TOKEN_BUDGET)
        ) {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId: user?.id,
            visitorId: visitorId ?? null,
            ip,
            status: 'rate_limited',
            metadata: { reason: 'ip_limit', key_source: keySource },
          })
          return jsonError(
            'Guest usage from this network has hit its limit for now. Create a free account to continue.',
            429
          )
        }

        if (snapshot.lastRequestAtMs && now - snapshot.lastRequestAtMs < minIntervalMs) {
          await logUsageEvent(admin, {
            scopeKey,
            route: ROUTE_KEY,
            requesterKind,
            userId: user?.id,
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
            userId: user?.id,
            visitorId: visitorId ?? null,
            ip,
            status: 'rate_limited',
            metadata: { reason: 'hourly_limit', key_source: keySource },
          })
          return jsonError('You have reached the hourly limit for this tool. Please retry shortly.', 429)
        }
      } catch (usageError) {
        console.error('Grant usage snapshot failed; falling back to in-memory limits', sanitizeForLog(usageError))
        // Fail toward the in-memory limiter rather than proceeding with a
        // fresh budget and no rate limit — this path previously called
        // OpenAI unmetered.
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

    const estimatedInputTokens = estimateTokens(`${contextText}\n\n${messageText}`)

    if (tokensUsed24h + estimatedInputTokens > budgetCap) {
      return jsonError('Daily AI usage budget reached for this session. Please continue tomorrow or sign in for higher limits.', 429, {
        requiresSignup: !user,
        remainingBudget: Math.max(0, budgetCap - tokensUsed24h),
      })
    }

    const apiKey = userProvidedApiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      return jsonError('Grant AI is not configured yet.', 503)
    }

    const modeInstruction =
      mode === 'draft'
        ? 'The user is requesting a first full narrative draft. Use the default structure unless section focus says otherwise.'
        : 'The user is revising an existing draft. Preserve strong material and apply requested edits precisely.'

    const maxOutputTokens = user ? MAX_OUTPUT_TOKENS_MEMBER : MAX_OUTPUT_TOKENS_GUEST

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
          max_output_tokens: maxOutputTokens,
          input: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'system',
              content: modeInstruction,
            },
            {
              role: 'system',
              content: `Grant context:\n${contextText}`,
            },
            ...(latestDraft
              ? [
                  {
                    role: 'system' as const,
                    content: `Current draft under revision:\n${latestDraft}`,
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
      clearTimeout(timeout)
      const timedOut = fetchError instanceof Error && fetchError.name === 'AbortError'
      return jsonError(
        timedOut
          ? 'Grant assistant timed out while generating your draft. Please retry with a shorter target word count or narrower section focus.'
          : 'Grant assistant is temporarily unavailable. Please retry in a minute.',
        timedOut ? 504 : 502
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!openAiResponse.ok) {
      const details = await openAiResponse.text()
      console.error('Grant lab upstream error',
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
            userId: user?.id,
            visitorId: visitorId ?? null,
            ip,
            inputTokens: estimatedInputTokens,
            status: 'upstream_error',
            metadata: { status: openAiResponse.status, key_source: keySource },
          })
        } catch (logError) {
          console.error('Grant usage log failed (upstream error)', sanitizeForLog(logError))
        }
      }

      return jsonError('Grant assistant is temporarily unavailable. Please retry in a minute.', 502)
    }

    const payload = (await openAiResponse.json()) as unknown
    const reply = extractOutputText(payload)

    if (!reply) {
      return jsonError('No response generated. Please try again.', 502)
    }

    const outputTokens = estimateTokens(reply)
    const totalUsed = tokensUsed24h + estimatedInputTokens + outputTokens

    if (admin) {
      try {
        await logUsageEvent(admin, {
          scopeKey,
          route: ROUTE_KEY,
          requesterKind,
          userId: user?.id,
          visitorId: visitorId ?? null,
          ip,
          inputTokens: estimatedInputTokens,
          outputTokens,
          status: 'completed',
          metadata: {
            model: CHAT_MODEL,
            mode,
            messageCount: userMessages.length,
            key_source: keySource,
          },
        })
      } catch (logError) {
        console.error('Grant usage log failed (completed)', sanitizeForLog(logError))
      }
    }

    return NextResponse.json({
      ok: true,
      reply,
      model: CHAT_MODEL,
      remainingBudget: Math.max(0, budgetCap - totalUsed),
      budgetCap,
      isAuthenticated: !!user,
    })
  } catch (error) {
    console.error('Grant lab route error', sanitizeForLog(error))
    return jsonError('Unexpected server error.', 500)
  }
}
