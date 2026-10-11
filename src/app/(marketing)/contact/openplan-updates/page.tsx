import type { Metadata } from 'next'
import { ContactPageShell } from '@/components/features/contact-page-shell'

export const metadata: Metadata = {
  title: 'OpenPlan Updates',
  description: 'Ask for updates on OpenPlan releases, pilots, and hosted setups.',
}

export default function OpenPlanUpdatesPage() {
  return (
    <ContactPageShell
      title="OpenPlan updates"
      subtitle="Ask for news on OpenPlan releases, pilots, and hosted setups. No purchase is involved."
      initialIntent="updates"
      initialTopic="openplan"
      initialProduct="openplan"
    />
  )
}
