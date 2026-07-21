import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildLeadRoutingMeta, normalizeLeadRoutingValue } from '@/lib/lead-routing'

type LeadPayload = {
  firstName: string
  lastName: string
  email: string
  organization: string
  inquiryType: string
  timeline: string
  description: string
  budgetRange?: string
  projectGeography?: string
  desiredStartDate?: string
  website?: string // honeypot
  sourcePath?: string
  turnstileToken?: string
  topic?: string
  intent?: string
  product?: string
  tier?: string
}

type TurnstileResponse = {
  success: boolean
  ['error-codes']?: string[]
}

function badRequest(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status })
}

function normalize(input: unknown): string {
  return String(input ?? '').trim()
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Partial<LeadPayload>

    // Honeypot anti-spam field (must stay empty)
    if (normalize(payload.website)) {
      return NextResponse.json({ ok: true })
    }

    const firstName = normalize(payload.firstName)
    const lastName = normalize(payload.lastName)
    const email = normalize(payload.email).toLowerCase()
    const organization = normalize(payload.organization)
    const inquiryType = normalize(payload.inquiryType)
    const timeline = normalize(payload.timeline)
    const description = normalize(payload.description)
    const budgetRange = normalize(payload.budgetRange)
    const projectGeography = normalize(payload.projectGeography)
    const desiredStartDate = normalize(payload.desiredStartDate)
    const sourcePath = normalize(payload.sourcePath) || '/contact'
    const turnstileToken = normalize(payload.turnstileToken)
    const topic = normalizeLeadRoutingValue(payload.topic)
    const intent = normalizeLeadRoutingValue(payload.intent)
    const product = normalizeLeadRoutingValue(payload.product)
    const tier = normalize(payload.tier)

    if (!firstName || !lastName || !email || !inquiryType || !description) {
      return badRequest('Please complete all required fields.')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return badRequest('Please enter a valid email address.')
    }

    if (description.length < 20) {
      return badRequest('Please add more detail so we can route your request correctly.')
    }

    // Upper bounds — without these, multi-megabyte values insert verbatim.
    const maxLengths: Array<[string, number]> = [
      [firstName, 80],
      [lastName, 80],
      [email, 254],
      [organization, 160],
      [inquiryType, 60],
      [timeline, 60],
      [description, 5000],
      [budgetRange, 60],
      [projectGeography, 160],
      [desiredStartDate, 40],
      [sourcePath, 300],
      [tier, 60],
    ]

    if (maxLengths.some(([value, max]) => value.length > max)) {
      return badRequest('One of the fields is too long. Please shorten it and resubmit.', 413)
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return badRequest('Lead capture is not configured yet. Please email nathaniel@natfordplanning.com.', 503)
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
    const userAgent = req.headers.get('user-agent') || null

    // Optional Turnstile verification (enable by setting TURNSTILE_SECRET_KEY)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || ''

    if (turnstileSecret) {
      if (!turnstileToken) {
        return badRequest('Please complete the anti-spam verification.')
      }

      const verifyBody = new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
      })

      if (forwardedFor) verifyBody.set('remoteip', forwardedFor)

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: verifyBody,
      })

      if (!verifyRes.ok) {
        return badRequest('Could not verify anti-spam challenge. Please try again.')
      }

      const verification = (await verifyRes.json()) as TurnstileResponse

      if (!verification.success) {
        return badRequest('Anti-spam verification failed. Please try again.')
      }
    }

    // Rate limiting + duplicate dampening
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()

    const { count: emailCount } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if ((emailCount || 0) >= 3) {
      return badRequest('Too many submissions from this email in a short period. Please try again later.', 429)
    }

    if (forwardedFor) {
      const { count: ipCount } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('ip_address', forwardedFor)
        .gte('created_at', oneHourAgo)

      if ((ipCount || 0) >= 10) {
        return badRequest('Too many submissions from this network in a short period. Please try again later.', 429)
      }
    }

    const { count: duplicateCount } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .eq('description', description)
      .gte('created_at', tenMinutesAgo)

    if ((duplicateCount || 0) > 0) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    const { error } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      organization: organization || 'Not provided',
      inquiry_type: inquiryType,
      timeline: timeline || 'Not specified',
      description,
      source_path: sourcePath,
      ip_address: forwardedFor,
      meta: buildLeadRoutingMeta({
        ip: forwardedFor,
        userAgent,
        topic,
        intent,
        product,
        tier,
        budgetRange,
        projectGeography,
        desiredStartDate,
      }),
    })

    if (error) {
      console.error('Lead insert error', error)
      return badRequest('Could not submit your request right now. Please try again or email us directly.', 500)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead API error', error)
    return badRequest('Invalid request payload.', 400)
  }
}
