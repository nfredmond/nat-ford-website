'use client'

import * as React from 'react'
import Script from 'next/script'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { buildContactPrefill, budgetRanges, inquiryTypes, timelines } from '@/lib/contact-prefill'

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void
    onTurnstileExpired?: () => void
    onTurnstileError?: () => void
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

type ContactIntakeFormProps = {
  initialIntent?: string
  initialTopic?: string
  initialInquiry?: string
  initialProduct?: string
  initialTier?: string
}

export function ContactIntakeForm({
  initialIntent = '',
  initialTopic = '',
  initialInquiry = '',
  initialProduct = '',
  initialTier = '',
}: ContactIntakeFormProps) {
  const [submitted, setSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = React.useState('')

  const {
    requestIntent,
    requestTopic,
    checkoutProduct,
    checkoutTier,
    contextNotice,
    defaultInquiryType,
    defaultTimeline,
    defaultDescription,
    submitLabel,
    successTitle,
    successMessage,
  } = buildContactPrefill({ initialIntent, initialTopic, initialInquiry, initialProduct, initialTier })

  React.useEffect(() => {
    if (!turnstileSiteKey) return

    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token)
    window.onTurnstileExpired = () => setTurnstileToken('')
    window.onTurnstileError = () => setTurnstileToken('')

    return () => {
      delete window.onTurnstileSuccess
      delete window.onTurnstileExpired
      delete window.onTurnstileError
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    if (turnstileSiteKey && !turnstileToken) {
      setError('Please complete the anti-spam verification.')
      setIsSubmitting(false)
      return
    }

    const formEl = e.currentTarget
    const form = new FormData(formEl)

    const payload = {
      firstName: String(form.get('firstName') || ''),
      lastName: String(form.get('lastName') || ''),
      email: String(form.get('email') || ''),
      organization: String(form.get('organization') || ''),
      inquiryType: String(form.get('inquiryType') || ''),
      timeline: String(form.get('timeline') || ''),
      description: String(form.get('description') || ''),
      budgetRange: String(form.get('budgetRange') || ''),
      projectGeography: String(form.get('projectGeography') || ''),
      desiredStartDate: String(form.get('desiredStartDate') || ''),
      website: String(form.get('website') || ''),
      sourcePath: typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/contact',
      turnstileToken,
      topic: requestTopic,
      intent: requestIntent,
      product: checkoutProduct,
      tier: checkoutTier,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string }

      if (!res.ok || !data.ok) {
        setError(data.message || 'Could not submit right now. Please try again in a moment.')
        return
      }

      formEl.reset()
      setSubmitted(true)
      setTurnstileToken('')
    } catch {
      setError('Connection issue. Please try again or email nathaniel@natfordplanning.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return !submitted ? (
    <>
      <p className="mb-5 text-sm leading-6 text-[color:var(--foreground)]/78">
        Send the essential details now. Budget, exact dates, and geography are helpful but optional — we can sort those out in discovery.
      </p>
      {contextNotice ? (
        <div className="mb-6 rounded-xl border border-[color:var(--pine)]/25 bg-[color:var(--sand)]/35 px-4 py-3 text-sm text-[color:var(--foreground)]/85">
          <p className="font-semibold text-[color:var(--pine)]">{contextNotice.title}</p>
          <p className="mt-1">{contextNotice.body}</p>
        </div>
      ) : null}
      <form key={`${requestTopic}:${requestIntent}:${checkoutProduct}:${checkoutTier}`} onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="First Name" name="firstName" required />
          <Input label="Last Name" name="lastName" required />
        </div>

        <Input label="Email" name="email" type="email" required />
        <Input label="Organization (optional)" name="organization" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-medium text-[color:var(--ink)]">
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              defaultValue={defaultInquiryType}
              required
              className="flex h-11 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--background)] px-3.5 py-2 text-sm text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pine)]"
            >
              <option value="">Select one</option>
              {inquiryTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-[color:var(--ink)]">
              Desired Timeline <span className="font-normal text-[color:var(--foreground)]/62">(optional)</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              defaultValue={defaultTimeline}
              className="flex h-11 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--background)] px-3.5 py-2 text-sm text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pine)]"
            >
              <option value="">Select one</option>
              {timelines.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Textarea
          label="What should we help you solve?"
          name="description"
          defaultValue={defaultDescription}
          placeholder="What decision, workflow, deployment, or deadline are you trying to move forward?"
          rows={5}
          required
        />

        <details className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--fog)]/40 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[color:var(--ink)]">
            Optional scoping details
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="budgetRange" className="mb-1.5 block text-sm font-medium text-[color:var(--ink)]">
                Budget Range <span className="font-normal text-[color:var(--foreground)]/62">(optional)</span>
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                defaultValue=""
                className="flex h-11 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--background)] px-3.5 py-2 text-sm text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pine)]"
              >
                <option value="">Select a range</option>
                {budgetRanges.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Desired Start Window (optional)"
              name="desiredStartDate"
              type="date"
            />

            <div className="sm:col-span-2">
              <Input
                label="Project Geography (optional)"
                name="projectGeography"
                placeholder="County, region, or service area"
              />
            </div>
          </div>
        </details>

        {turnstileSiteKey && (
          <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-callback="onTurnstileSuccess"
              data-expired-callback="onTurnstileExpired"
              data-error-callback="onTurnstileError"
              data-theme="auto"
            />
          </>
        )}

        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <Button type="submit" size="lg" disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}>
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Submitting…' : submitLabel}
        </Button>
        <p className="text-xs leading-5 text-[color:var(--foreground)]/68">
          Typical response: 1–2 business days. If this is urgent, email nathaniel@natfordplanning.com directly.
        </p>
      </form>
    </>
  ) : (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--pine)] text-white">
        <Send className="h-6 w-6" />
      </div>
      <h3 className="text-2xl font-semibold text-[color:var(--ink)]">
        {successTitle}
      </h3>
      <p className="mt-3 text-[color:var(--foreground)]/75">{successMessage}</p>
      <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
        Submit Another Inquiry
      </Button>
    </div>
  )
}
