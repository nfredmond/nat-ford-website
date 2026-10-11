import type { Metadata } from 'next'
import { ContactPageShell } from '@/components/features/contact-page-shell'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathaniel Redmond at Nat Ford Planning & Analysis about transportation planning, grants, GIS, or open-source planning software.',
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
      title="Contact Nathaniel"
      subtitle="Describe the project, the deadline, and the funding program if there is one."
      initialIntent={firstParam(params.intent)}
      initialTopic={firstParam(params.topic)}
      initialInquiry={firstParam(params.inquiry) || firstParam(params.service)}
      initialProduct={firstParam(params.product)}
      initialTier={firstParam(params.tier)}
    />
  )
}
