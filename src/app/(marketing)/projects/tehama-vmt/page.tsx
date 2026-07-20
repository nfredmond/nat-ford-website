import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'

export const metadata: Metadata = {
  title: 'Tehama County VMT & CIP — Project Experience',
  description:
    'VMT analysis integrated with a prioritized capital improvement program for Tehama County, connecting VMT-reducing strategy to buildable projects. Completed at Green DOT Transportation Solutions.',
}

const scope = [
  {
    title: 'Finding the levers that move VMT',
    body: 'Assessed which land-use and transportation strategies actually reduce vehicle-miles-traveled in a rural county, where the levers that work in a city often do not translate.',
  },
  {
    title: 'Strategy into capital projects',
    body: 'Connected each VMT-reducing strategy to concrete capital projects, so the analysis pointed at things that could be built rather than at intentions.',
  },
  {
    title: 'A prioritized CIP',
    body: 'Integrated those projects into a capital improvement program with a defensible ordering, weighing cost, readiness, and benefit against one another.',
  },
  {
    title: 'Aligned with real funding',
    body: 'Matched the program to carbon-reduction and active-transportation funding sources the county could realistically pursue.',
  },
]

export default function TehamaVMTPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField className="opacity-80" />
        <Container size="lg" className="relative py-14 md:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--pine)] dark:hover:text-[color:var(--pine-soft)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Project experience
          </Link>

          <p className="index-label mt-8">Prior employment · VMT &amp; capital programming</p>
          <h1 className="display-1 mt-6 text-[color:var(--ink)]">Tehama County VMT &amp; CIP</h1>
          <p className="lead measure-wide mt-6 text-[color:var(--muted)]">
            Under California&rsquo;s shift to vehicle-miles-traveled as the measure of transportation
            impact, Tehama County needed to show how it would reduce VMT, then prove those reductions
            could become real projects. The work connected the VMT analysis to a capital improvement
            program, so the strategy did not stop at policy language.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="provenance">Tehama County, CA</span>
            <span className="provenance">2025</span>
            <span className="provenance">Green DOT Transportation Solutions</span>
            <span className="provenance">SB 743 · VMT</span>
          </div>
        </Container>
      </section>

      {/* ── What the work was ────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">What the work was</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                VMT strategy that ends in a buildable program.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                VMT analysis often stops at a number and a list of policies. The point here was to
                carry it further, into a capital improvement program where each strategy corresponds
                to a project the county can sequence, cost, and fund.
              </p>
            </div>

            <dl className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {scope.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 py-7 sm:grid-cols-[1.5rem_1fr] sm:gap-6"
                >
                  <div
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 translate-y-2.5 rounded-full bg-[color:var(--copper)] sm:block"
                  />
                  <div>
                    <dt className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {item.title}
                    </dt>
                    <dd className="measure mt-2.5 text-[color:var(--muted)]">{item.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── Attribution + navigation ─────────────────────────── */}
      <Section spacing="lg" className="border-t border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="lg">
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16">
            <div className="surface-card p-6 md:p-7">
              <p className="label">Attribution</p>
              <p className="measure mt-3 text-[color:var(--muted)]">
                This work was completed while I was employed at Green DOT Transportation Solutions.
                It is listed here for experience and technical context, not as a Nat Ford Planning
                &amp; Analysis portfolio project.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4" /> Back to project experience
                </Link>
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                See current planning services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
