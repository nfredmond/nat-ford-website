import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of Nat Ford Planning & Analysis services and products, including OpenPlan.',
}

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: 'Service Commitments',
    body: 'We provide professional planning and software services using transparent methods, clear assumptions, and fair pricing principles. Scope, deliverables, timeline, and exclusions are documented in each proposal or statement of work.',
  },
  {
    heading: 'AI Use and Human Review',
    body: 'AI may be used to accelerate drafting, data cleaning, formatting, and interpretation support. Final analysis, conclusions, and recommendations are reviewed and approved by Nathaniel Ford Redmond, the planner responsible for the work.',
  },
  {
    heading: 'Fees, Scope Changes, and Payment',
    body: 'Pricing is based on transparent scope and effort assumptions. Scope changes are handled through a non-punitive written addendum with options to reduce scope, extend schedule, or adjust fee.',
  },
  {
    heading: 'No Guarantee of Funding or Outcomes',
    body: 'Planning recommendations and grant support improve competitiveness but do not guarantee funding awards, approvals, or downstream outcomes outside our direct control.',
  },
  {
    heading: 'Confidentiality',
    body: 'We treat client information as confidential and use it only for contracted work, subject to applicable law and agreed disclosure terms.',
  },
  {
    heading: 'Contact',
    body: (
      <>
        Questions about these Terms:{' '}
        <a
          href="mailto:nathaniel@natfordplanning.com"
          className="font-medium text-[color:var(--pine)] underline underline-offset-2 hover:text-[color:var(--pine-deep)] dark:text-[color:var(--pine-soft)]"
        >
          nathaniel@natfordplanning.com
        </a>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <Container size="lg" className="relative py-16 md:py-20">
          <div className="measure-wide">
            <p className="index-label">Legal</p>
            <h1 className="display-2 mt-6 text-[color:var(--ink)]">Terms of Service</h1>
            <p className="data mt-6 text-sm text-[color:var(--muted)]">
              Last updated: February 24, 2026
            </p>
          </div>
        </Container>
      </section>

      {/* ── Terms ─────────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="measure-wide">
            <p className="lead text-[color:var(--muted)]">
              These Terms govern your use of Nat Ford Planning &amp; Analysis services and products,
              including OpenPlan. By using our services, you agree to these Terms.
            </p>

            <div className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {sections.map((section, i) => (
                <section
                  key={section.heading}
                  className="grid gap-2 py-8 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {section.heading}
                    </h2>
                    <p className="mt-3 leading-7 text-[color:var(--muted)]">{section.body}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
