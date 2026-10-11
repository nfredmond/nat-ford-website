import type { Metadata } from 'next'
import { ContactPageShell } from '@/components/features/contact-page-shell'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathaniel Redmond about OpenPlan, his other open-source planning tools, or collaboration.',
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
      subtitle="Questions about OpenPlan, bug reports, or ideas for working together. For bugs and feature requests, open an issue on GitHub."
      initialIntent={firstParam(params.intent)}
      initialTopic={firstParam(params.topic)}
      initialInquiry={firstParam(params.inquiry) || firstParam(params.service)}
      initialProduct={firstParam(params.product)}
      initialTier={firstParam(params.tier)}
    />
  )
}
