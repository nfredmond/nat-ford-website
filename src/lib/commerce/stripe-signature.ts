import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Stripe webhook signature verification.
 * Kept dependency-light and pure so scripts/test-stripe-webhook-signature.mjs
 * can exercise it directly.
 */

// Stripe's own SDK default. Signed payloads older (or newer) than this are
// rejected so a captured webhook body cannot be replayed indefinitely.
export const SIGNATURE_TOLERANCE_SECONDS = 300

export function parseStripeSignature(signatureHeader: string) {
  const fields = signatureHeader.split(',').map((part) => part.trim())
  const timestampField = fields.find((field) => field.startsWith('t='))
  const v1Field = fields.find((field) => field.startsWith('v1='))

  if (!timestampField || !v1Field) {
    return null
  }

  const timestamp = timestampField.slice(2)
  const signature = v1Field.slice(3)
  if (!timestamp || !signature) {
    return null
  }

  return { timestamp, signature }
}

export function computeStripeSignature(rawBody: string, timestampSeconds: number, secret: string) {
  return createHmac('sha256', secret).update(`${timestampSeconds}.${rawBody}`, 'utf8').digest('hex')
}

export function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  nowMs: number = Date.now()
) {
  const parsed = parseStripeSignature(signatureHeader)
  if (!parsed) return false

  const timestampSeconds = Number(parsed.timestamp)
  if (!Number.isFinite(timestampSeconds)) return false
  if (Math.abs(nowMs / 1000 - timestampSeconds) > SIGNATURE_TOLERANCE_SECONDS) return false

  const expected = createHmac('sha256', secret).update(`${parsed.timestamp}.${rawBody}`, 'utf8').digest('hex')

  try {
    return timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(parsed.signature, 'utf8'))
  } catch {
    return false
  }
}
