import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'AI Use and Ethics',
  description:
    'How Nat Ford Planning & Analysis uses AI in deliverables, handles client data, prices work, and reports problems.',
}

const policies = [
  {
    heading: 'AI use',
    points: [
      'AI helps with drafting, data preparation, and formatting.',
      'A qualified planner reviews and approves every analysis, conclusion, and recommendation. AI does not sign off on any work.',
      'Regulatory and technical claims carry a citation, or they are marked for verification before anyone relies on them.',
      'Deliverables include the methods and assumptions behind them.',
    ],
  },
  {
    heading: 'Client data',
    points: [
      'Client data is never sold.',
      'Data from one client is not reused for another without written permission.',
      'Sensitive data is limited to what the work needs, access-controlled, and deleted when the work no longer needs it.',
    ],
  },
  {
    heading: 'Methods and estimates',
    points: [
      'Every deliverable states its assumptions and limits.',
      'Screening-level estimates are labeled as such on the page where they appear, not in a footnote.',
    ],
  },
  {
    heading: 'Pricing and problems',
    points: [
      'Rates do not change with deadline pressure.',
      'If scope, schedule, or quality slips, the client hears about it early, with a plan to correct it.',
      'Some capacity is held at reduced rates for under-resourced agencies.',
    ],
  },
  {
    heading: 'Communities',
    points: [
      'Recommendations do not shift cost, risk, or burden onto disadvantaged or Tribal communities to make a project work on paper.',
    ],
  },
]

export default function EthicsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <div>
            <h1 className="display-1 text-[color:var(--ink)]">AI use and ethics</h1>
            <p className="lead measure mt-6 text-[color:var(--muted)]">
              Planning work ends up in board packets, grant files, and the public record. These
              are the standards it follows.
            </p>
            <p className="mt-8 font-ui text-[color:var(--muted)]">
              Questions about a policy:{' '}
              <Link href="/contact" className="prose-link font-semibold">
                contact Nathaniel
              </Link>
              .
            </p>
          </div>

          <div className="space-y-12">
            {policies.map((policy) => (
              <div key={policy.heading}>
                <h2 className="display-3 border-t-[3px] border-[color:var(--ink)] pt-5 text-[color:var(--ink)]">
                  {policy.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {policy.points.map((point) => (
                    <li key={point} className="measure flex items-baseline gap-4">
                      <span aria-hidden="true" className="lane-dash shrink-0 -translate-y-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
