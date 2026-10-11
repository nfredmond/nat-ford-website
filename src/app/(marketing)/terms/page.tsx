import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms for using natfordplanning.com and its free tools. The open-source software is governed by its own licenses.',
}

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: 'This site',
    body: 'natfordplanning.com is published by Nat Ford Planning & Analysis to present OpenPlan and other open-source planning software by Nathaniel Redmond. No professional services are sold through this site.',
  },
  {
    heading: 'Software licenses',
    body: 'Each software project is governed by the license in its repository. OpenPlan is licensed under Apache-2.0. Those licenses, not these terms, control how you may use, change, and share the software, and they include their own warranty disclaimers.',
  },
  {
    heading: 'Free tools',
    body: 'The funding readiness scorecard and the Grant Narrative Lab are self-help tools. Their results are not professional, legal, or eligibility advice, and they do not guarantee funding, approval, or any other outcome.',
  },
  {
    heading: 'AI-generated drafts',
    body: 'The Grant Narrative Lab uses OpenAI to generate text. Drafts can contain errors or unsupported claims. You are responsible for reviewing and verifying any draft before you use it.',
  },
  {
    heading: 'Accounts and fair use',
    body: 'Keep your sign-in credentials private. Usage limits protect the free tools from abuse, and accounts or addresses that misuse them may be blocked.',
  },
  {
    heading: 'No warranty',
    body: 'This site and its tools are provided as is, without warranties of any kind, to the extent the law allows.',
  },
  {
    heading: 'Changes',
    body: 'These terms may change. The date at the top of this page shows the latest revision.',
  },
  {
    heading: 'Contact',
    body: (
      <>
        Questions about these terms:{' '}
        <a href="mailto:nathaniel@natfordplanning.com" className="prose-link font-semibold">
          nathaniel@natfordplanning.com
        </a>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <div>
            <h1 className="display-1 text-[color:var(--ink)]">Terms of use</h1>
            <p className="mt-6 font-ui text-[color:var(--muted)]">Last updated: October 10, 2026</p>
          </div>
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="display-3 border-t-[3px] border-[color:var(--ink)] pt-5 text-[color:var(--ink)]">
                  {section.heading}
                </h2>
                <p className="measure mt-3">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
