import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'

export const metadata: Metadata = {
  title: 'Del Norte County ATP — Project Experience',
  description:
    'Active Transportation Plan support for Del Norte County: reading a thin coastal network for gaps and turning them into phaseable, grant-ready projects. Completed at Green DOT Transportation Solutions.',
}

const scope = [
  {
    title: 'Reading the network for gaps',
    body: 'Mapped where the walking and biking network breaks down across the county’s populated coastal areas, with particular attention to the routes children use to reach school.',
  },
  {
    title: 'A Safe Routes lens',
    body: 'Weighted the analysis toward school access, because Safe Routes to School connectivity carries real weight in how the state scores Active Transportation Program applications.',
  },
  {
    title: 'Gaps into projects',
    body: 'Translated a diffuse list of needs into discrete, phaseable segments, each defined well enough to stand on its own as a fundable project rather than a line on a wish list.',
  },
  {
    title: 'Grant-ready applications',
    body: 'Assembled the mapping, the demonstrated need, and the narrative into ATP applications the county could submit, built to read clearly to a scoring committee.',
  },
]

export default function DelNorteATPPage() {
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

          <p className="index-label mt-8">Prior employment · Active transportation</p>
          <h1 className="display-1 mt-6 text-[color:var(--ink)]">Del Norte County ATP</h1>
          <p className="lead measure-wide mt-6 text-[color:var(--muted)]">
            Del Norte County sits at the far northwest corner of California, where the active
            transportation network is thin and the distance between where people walk and where it
            is safe to walk runs wide. The work was to inventory those gaps and turn them into a plan
            the county could actually fund.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="provenance">Del Norte County, CA</span>
            <span className="provenance">2024</span>
            <span className="provenance">Green DOT Transportation Solutions</span>
            <span className="provenance">State ATP program</span>
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
                Coastal network gaps, turned into fundable projects.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                An Active Transportation Plan is only as useful as the projects it can hand to a
                grant program. Most of the effort went into that translation: from a general sense
                that a corridor felt unsafe, to a specific, buildable segment with a defensible
                reason to fund it.
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
