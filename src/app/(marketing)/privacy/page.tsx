import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Nat Ford Planning & Analysis collects, uses, and protects the information you share when you use our services and products.',
}

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: 'What We Collect',
    body: 'We collect contact and project information needed to provide requested services, operate products, and communicate about project delivery.',
  },
  {
    heading: 'How We Use Data',
    body: 'Data is used only for service delivery, product operation, support, and related business administration. We do not sell client data.',
  },
  {
    heading: 'AI and Data Handling',
    body: 'AI-assisted workflows may process project content for drafting and analysis support. Final conclusions are human-reviewed. Client data is not reused across clients without explicit permission.',
  },
  {
    heading: 'Retention and Access Controls',
    body: 'We minimize sensitive data collection, apply access controls, and retain data only as long as necessary for contracted work, legal obligations, and operational continuity.',
  },
  {
    heading: 'Contact',
    body: (
      <>
        Privacy questions:{' '}
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

export default function PrivacyPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <Container size="lg" className="relative py-16 md:py-20">
          <div className="measure-wide">
            <p className="index-label">Legal</p>
            <h1 className="display-2 mt-6 text-[color:var(--ink)]">Privacy Policy</h1>
            <p className="data mt-6 text-sm text-[color:var(--muted)]">
              Last updated: February 24, 2026
            </p>
          </div>
        </Container>
      </section>

      {/* ── Policy ────────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="measure-wide">
            <p className="lead text-[color:var(--muted)]">
              Nat Ford Planning &amp; Analysis respects your privacy and is committed to responsible
              data stewardship. This policy explains how we collect, use, and protect information.
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
