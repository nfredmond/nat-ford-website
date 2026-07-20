import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Camera, Database, MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'Capture, compute, communicate: how every corridor, plan, and grant moves from field data to a decision a board can act on.',
}

const steps = [
  {
    number: '01',
    title: 'Capture',
    icon: Camera,
    description:
      'Get field and context data off the ground fast, with enough discipline that every input is traceable back to where it came from.',
    items: [
      'Flight and field prep: airspace and risk checks, a clear task per site',
      'Imagery and data collection matched to the question the analysis has to answer',
      'Constraint mapping across policy, land use, safety, and funding context',
    ],
  },
  {
    number: '02',
    title: 'Compute',
    icon: Database,
    description:
      'Turn raw inputs into analysis that holds up when someone checks the method behind it.',
    items: [
      'Photogrammetry and GIS processing with assumptions written down, not buried',
      'Spatial diagnostics for access, safety, equity, and feasibility',
      'QA and versioning before anything reaches a stakeholder',
    ],
  },
  {
    number: '03',
    title: 'Communicate',
    icon: MessageSquare,
    description:
      'Translate the technical findings into something a board can read and a grant can cite.',
    items: [
      'Maps, narratives, and visuals built for mixed audiences, not just engineers',
      'Funding and implementation framing tied to the real constraints on the ground',
      'A clean handoff package so the next step can start without you',
    ],
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">
                Capture → Compute → Communicate
              </p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Every project runs the same three stages.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                A corridor study, an ATP application, a VMT screen: they all move through the same
                sequence. Get real data off the ground, turn it into analysis that holds up under
                review, and hand back maps and narratives a board can act on.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Discuss your project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Browse the services</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-mainstreet-parking-2026-03.jpg"
                  alt="Aerial oblique of a small-town main street showing curb activity and on-street parking"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Main-street capture</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Aerial oblique · Northern California</span>
                <span className="provenance">Stage 01 · Capture</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── The workflow ─────────────────────────────────────── */}
      <Section spacing="xl">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The workflow</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Three stages, run in order.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Nothing skips ahead. The analysis does not start until the capture is clean, and
              nothing reaches a board until the method behind it can be checked. That sequencing is
              what keeps the work fundable and defensible later.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <li
                  key={step.number}
                  className="grid gap-6 py-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12 lg:gap-20"
                >
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="data mt-1 text-4xl font-medium leading-none text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]"
                    >
                      {step.number}
                    </span>
                    <div>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-2)] text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="display-3 mt-4 text-[color:var(--ink)]">{step.title}</h3>
                    </div>
                  </div>

                  <div className="md:pt-1">
                    <p className="measure text-[color:var(--muted)]">{step.description}</p>
                    <ul className="mt-5 space-y-3">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <ArrowRight
                            className="mt-1 h-4 w-4 shrink-0 text-[color:var(--copper)]"
                            aria-hidden="true"
                          />
                          <span className="text-[0.95rem] leading-6 text-[color:var(--foreground)]/85">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </Container>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-t border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="index-label text-[color:var(--copper)]">Start a project</p>
            <h2 className="display-2 mt-5 text-white">
              Want this run on your corridor?
            </h2>
            <p className="mt-5 text-white/70">
              Tell me what you are working on and I will scope a delivery path with milestones,
              review points, and funding relevance from the first stage. No sales team, no funnel,
              just a scoping conversation with the planner who does the work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="/contact?intent=discovery">
                  Discuss your project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">See the planning work</Link>
              </Button>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="font-mono text-sm text-[color:var(--copper)] hover:underline"
              >
                nathaniel@natfordplanning.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
