import type { Metadata } from 'next'
import { ContactPageShell } from '@/components/features/contact-page-shell'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a focused intake with Nat Ford so scope, timeline, and delivery model are clear before work begins.',
}

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : {}

  return (
    <ContactPageShell
      title="Schedule discovery. Scope the right next step."
      subtitle="Share the essentials first. We’ll respond within 1–2 business days with a practical next step for implementation support, custom software, planning, GIS, grant, or aerial work."
      initialIntent={firstParam(params.intent)}
      initialTopic={firstParam(params.topic)}
      initialProduct={firstParam(params.product)}
      initialTier={firstParam(params.tier)}
    />
  )
}
