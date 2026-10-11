import type { Metadata } from 'next'
import { ContactPageShell } from '@/components/features/contact-page-shell'

export const metadata: Metadata = {
  title: 'Funding Readiness Review',
  description:
    'Request a focused intake to review scorecard results, identify key readiness gaps, and define the cleanest next step.',
}

export default function FundingReadinessContactPage() {
  return (
    <ContactPageShell
      title="Funding readiness review"
      subtitle="Share your scorecard result, the main gaps, and the funding cycle you are aiming for. This review is not an eligibility determination."
      initialTopic="funding-readiness-scorecard"
      initialIntent="scorecard-review"
    />
  )
}
