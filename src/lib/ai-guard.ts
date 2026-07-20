import { NextRequest, NextResponse } from 'next/server'
import { findActiveAiBan, logUsageEvent } from '@/lib/ai-usage'
import { sanitizeForLog } from '@/lib/security/redact-secrets'

/**
 * Shared helpers for the AI chat routes (planner, grant-lab).
 * Only the byte-for-byte identical logic lives here — the route-specific
 * flows (guest grace, token budgets, prompt grounding) stay in each route.
 */

const AI_BAN_CHECK_FAIL_OPEN = process.env.AI_BAN_CHECK_FAIL_OPEN === 'true'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

type AdminClient = Parameters<typeof findActiveAiBan>[0]

export function jsonError(message: string, status = 400, extras: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, message, ...extras }, { status })
}

/** In non-prod, an explicit env flag lets abuse checks fail open so local dev isn't blocked. */
export function shouldFailOpenBanCheck() {
  return !IS_PRODUCTION && AI_BAN_CHECK_FAIL_OPEN
}

export function banCheckUnavailableResponse() {
  return jsonError('Safety systems are temporarily unavailable. Please retry in a moment.', 503)
}

export function getRequesterIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = req.headers.get('x-real-ip')?.trim()
  return forwarded || realIp || 'unknown-ip'
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/** Pull plain text out of an OpenAI Responses API payload, tolerant of shape. */
export function extractOutputText(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''

  const maybeText = (payload as { output_text?: unknown }).output_text
  if (typeof maybeText === 'string' && maybeText.trim().length > 0) {
    return maybeText.trim()
  }

  const output = (payload as { output?: unknown }).output
  if (!Array.isArray(output)) return ''

  const parts: string[] = []
  for (const item of output) {
    if (!item || typeof item !== 'object') continue

    const content = (item as { content?: unknown }).content
    if (!Array.isArray(content)) continue

    for (const block of content) {
      if (!block || typeof block !== 'object') continue
      const blockType = (block as { type?: unknown }).type
      const text = (block as { text?: unknown }).text

      if ((blockType === 'output_text' || blockType === 'text') && typeof text === 'string' && text.trim()) {
        parts.push(text.trim())
      }
    }
  }

  return parts.join('\n\n').trim()
}

type BanScope = {
  routeKey: string
  scopeKey: string
  requesterKind: 'member' | 'guest'
  userId: string | null | undefined
  visitorId: string | null
  ip: string
  keySource: string
}

/**
 * Run the abuse-control ban check for a request.
 * Returns a NextResponse to short-circuit the route (403 banned / 503 unavailable),
 * or null to continue. Behavior matches the previous inline block exactly: with no
 * admin client (or a failing check) it fails open only when shouldFailOpenBanCheck().
 */
export async function enforceAiBan(
  admin: AdminClient | null,
  scope: BanScope
): Promise<NextResponse | null> {
  if (!admin) {
    if (!shouldFailOpenBanCheck()) {
      console.error('AI abuse-control check unavailable', {
        route: scope.routeKey,
        reason: 'missing_admin_client',
        failOpen: shouldFailOpenBanCheck(),
      })
      return banCheckUnavailableResponse()
    }
    return null
  }

  try {
    const ban = await findActiveAiBan(admin, {
      route: scope.routeKey,
      userId: scope.userId ?? undefined,
      visitorId: scope.visitorId,
      ip: scope.ip,
    })

    if (ban) {
      try {
        await logUsageEvent(admin, {
          scopeKey: scope.scopeKey,
          route: scope.routeKey,
          requesterKind: scope.requesterKind,
          userId: scope.userId ?? undefined,
          visitorId: scope.visitorId,
          ip: scope.ip,
          status: 'blocked',
          metadata: {
            reason: ban.reason ?? 'blocked_by_admin',
            route: scope.routeKey,
            banId: ban.id,
            key_source: scope.keySource,
          },
        })
      } catch (logError) {
        console.error('AI blocked-event log failed', sanitizeForLog(logError))
      }

      return jsonError('This AI tool is temporarily unavailable for this session.', 403)
    }

    return null
  } catch (banError) {
    console.error('AI abuse-control check failed', {
      route: scope.routeKey,
      failOpen: shouldFailOpenBanCheck(),
      error: sanitizeForLog(banError),
    })

    if (!shouldFailOpenBanCheck()) {
      return banCheckUnavailableResponse()
    }
    return null
  }
}
