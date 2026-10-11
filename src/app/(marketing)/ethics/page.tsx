import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'AI Use and Ethics',
  description:
    'What Nat Ford Planning & Analysis is, how OpenPlan is built and licensed, how AI is used, and what this site does with your data.',
}

const policies = [
  {
    heading: 'What this site is',
    points: [
      'Nat Ford Planning & Analysis is the name Nathaniel Redmond publishes OpenPlan and his other open-source planning tools under.',
      'This site showcases that work. It does not sell services, and OpenPlan has no paid tier or payment step.',
    ],
  },
  {
    heading: 'Independence',
    points: [
      'Nathaniel builds OpenPlan and the other projects here on his own. They are not products of, and are not endorsed by, any employer or client.',
      'No employer or client data, documents, or confidential information go into these projects.',
      'The planning projects listed on the About page were delivered on staff at Green DOT Transportation Solutions from 2021 to 2025. They are prior-role experience, not Nat Ford projects.',
    ],
  },
  {
    heading: 'Open source',
    points: [
      'OpenPlan is licensed under Apache-2.0. Each project’s LICENSE file governs its terms.',
      'The full code and change history are public on GitHub, so anyone can check how a result is produced.',
    ],
  },
  {
    heading: 'Honest status',
    points: [
      'OpenPlan is in active development. Its model results are screening-level estimates, not validated forecasts.',
      'The repository lists known limitations and what each release has and has not proven. Read them before relying on an output.',
    ],
  },
  {
    heading: 'AI use',
    points: [
      'AI coding assistants help write and test the software. Every change is recorded in the public repository history.',
      'Inside OpenPlan, cloud AI is optional. Consequential facts, publication, adoption, and money stay under human control.',
      'The Grant Narrative Lab on this site sends what you type to OpenAI to generate a draft. Review and verify any draft before you use it.',
    ],
  },
  {
    heading: 'Your data on this site',
    points: [
      'The contact form and the Grant Narrative Lab collect only what the privacy policy lists. There are no advertising or analytics trackers.',
      'Nothing you send is sold or shared for marketing.',
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
              What this site is, how its software is built, and where AI is involved.
            </p>
            <p className="mt-8 font-ui text-[color:var(--muted)]">
              Read the{' '}
              <Link href="/privacy" className="prose-link font-semibold">
                privacy policy
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="prose-link font-semibold">
                contact Nathaniel
              </Link>{' '}
              with questions.
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
