import { NextRequest, NextResponse } from 'next/server'
import {
  LEAD_INBOX_COOKIE,
  LEAD_INBOX_SESSION_MS,
  computeLeadInboxToken,
  secureEquals,
} from '@/lib/security/lead-inbox-auth'

export const runtime = 'nodejs'

// This single password guards all lead PII, so failed logins are rate
// limited per IP. In-memory state is per-instance, which still turns an
// unthrottled online brute force into a slow one on each instance.
const MAX_FAILED_ATTEMPTS = 10
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000
const FAILED_ATTEMPT_DELAY_MS = 300

type AttemptState = {
  failures: number[]
}

declare global {
  var __leadInboxAuthAttempts: Map<string, AttemptState> | undefined
}

function getAttemptStore(): Map<string, AttemptState> {
  if (!globalThis.__leadInboxAuthAttempts) {
    globalThis.__leadInboxAuthAttempts = new Map<string, AttemptState>()
  }
  return globalThis.__leadInboxAuthAttempts
}

function getRequesterIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || req.headers.get('x-real-ip')?.trim() || 'unknown-ip'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const action = String(form.get('action') || 'login')
  const secret = process.env.LEAD_INBOX_PASSWORD || ''

  if (!secret) {
    return new NextResponse('Lead inbox auth is not configured. Set LEAD_INBOX_PASSWORD.', { status: 503 })
  }

  const redirectUrl = new URL('/lead-inbox', req.url)

  if (action === 'logout') {
    const res = NextResponse.redirect(redirectUrl, { status: 303 })
    res.cookies.delete(LEAD_INBOX_COOKIE)
    return res
  }

  const now = Date.now()
  const ip = getRequesterIp(req)
  const attemptStore = getAttemptStore()
  const attempts = attemptStore.get(ip) ?? { failures: [] }
  attempts.failures = attempts.failures.filter((at) => now - at <= LOCKOUT_WINDOW_MS)
  attemptStore.set(ip, attempts)

  if (attempts.failures.length >= MAX_FAILED_ATTEMPTS) {
    return new NextResponse('Too many failed attempts. Try again later.', { status: 429 })
  }

  const password = String(form.get('password') || '')

  if (!password || !secureEquals(password, secret)) {
    attempts.failures.push(now)
    await sleep(FAILED_ATTEMPT_DELAY_MS)
    redirectUrl.searchParams.set('error', '1')
    return NextResponse.redirect(redirectUrl, { status: 303 })
  }

  attemptStore.delete(ip)

  const expiresAtMs = now + LEAD_INBOX_SESSION_MS
  const token = computeLeadInboxToken(secret, expiresAtMs)
  const res = NextResponse.redirect(redirectUrl, { status: 303 })

  res.cookies.set(LEAD_INBOX_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: Math.floor(LEAD_INBOX_SESSION_MS / 1000),
  })

  return res
}
