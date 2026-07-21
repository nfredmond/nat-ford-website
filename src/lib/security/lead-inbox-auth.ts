import { createHash, createHmac, timingSafeEqual } from 'crypto'

export const LEAD_INBOX_COOKIE = 'nf_leads_auth'
export const LEAD_INBOX_SESSION_MS = 12 * 60 * 60 * 1000

function hmacFor(secret: string, expiresAtMs: number): string {
  return createHmac('sha256', secret).update(`natford-lead-inbox:${expiresAtMs}`).digest('hex')
}

/**
 * Token format: `<expiresAtMs>.<hmac>`. The expiry is inside the signed
 * payload, so a leaked cookie stops working when its session window ends
 * instead of remaining valid until the password itself is rotated.
 */
export function computeLeadInboxToken(secret: string, expiresAtMs: number): string {
  return `${expiresAtMs}.${hmacFor(secret, expiresAtMs)}`
}

/** Constant-time string comparison that doesn't leak length. */
export function secureEquals(a: string, b: string): boolean {
  const hashedA = createHash('sha256').update(a, 'utf8').digest()
  const hashedB = createHash('sha256').update(b, 'utf8').digest()
  return timingSafeEqual(hashedA, hashedB)
}

export function isLeadInboxAuthorized(
  cookieValue: string | undefined,
  secret: string,
  nowMs: number = Date.now()
): boolean {
  if (!cookieValue) return false

  const separatorIndex = cookieValue.indexOf('.')
  if (separatorIndex <= 0) return false

  const expiresAtMs = Number(cookieValue.slice(0, separatorIndex))
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs) return false

  const provided = cookieValue.slice(separatorIndex + 1)
  return secureEquals(provided, hmacFor(secret, expiresAtMs))
}
