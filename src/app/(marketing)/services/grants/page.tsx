import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funding & Grant Services',
  description:
    'Program-fit strategy, scoring-aware narratives, and submission packaging for ATP, HSIP, CRP, CMAQ, and FTA funding. Written by a Northern California transportation planner.',
}

// Real programs, real owning agencies. No claimed award rates, no fabricated wins.
const programs = [
  {
    code: 'ATP',
    agency: 'Caltrans · CTC',
    name: 'Active Transportation Program',
    body: 'Bike, pedestrian, and Safe Routes to School projects, on statewide and MPO competitions.',
  },
  {
    code: 'HSIP',
    agency: 'FHWA · Caltrans',
    name: 'Highway Safety Improvement Program',
    body: 'Data-driven safety fixes that live or die on the crash record and the benefit-cost case.',
  },
  {
    code: 'CRP',
    agency: 'FHWA',
    name: 'Carbon Reduction Program',
    body: 'Projects that measurably cut on-road transportation emissions.',
  },
  {
    code: 'CMAQ',
    agency: 'FHWA',
    name: 'Congestion Mitigation & Air Quality',
    body: 'Air-quality and congestion relief in nonattainment and maintenance areas.',
  },
  {
    code: 'FTA 5339',
    agency: 'FTA',
    name: 'Buses & Bus Facilities',
    body: 'Capital for transit vehicles, maintenance facilities, and related equipment.',
  },
  {
    code: 'FTA 5311',
    agency: 'FTA',
    name: 'Formula Grants for Rural Areas',
    body: 'Operating and capital support for transit in areas under 50,000 people.',
  },
  {
    code: 'FTA 5310',
    agency: 'FTA',
    name: 'Enhanced Mobility',
    body: 'Service for older adults and people with disabilities where fixed-route falls short.',
  },
]

// Kept at ~4 deliverables, rewritten in plain founder voice.
const deliverables = [
  {
    title: 'Funding fit matrix',
    body: 'Which programs your project can realistically win, and which are a wasted cycle. Sometimes the honest answer is to wait for a better call.',
  },
  {
    title: 'Scoring-aware narrative',
    body: 'Written against the published rubric, with every claimed benefit tied to a number you can defend in front of a reviewer.',
  },
  {
    title: 'Submission package + QC',
    body: 'Attachments, cost estimates, and letters assembled to the checklist, plus the quality pass that keeps you off the technical-rejection pile.',
  },
  {
    title: 'Post-award positioning',
    body: 'The readiness pieces, environmental status, local match, and a delivery schedule, that decide whether you keep the money after you win it.',
  },
]

export default function GrantsServicePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Funding &amp; grants</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Grant work for teams that can&rsquo;t waste a cycle.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                I help small and rural agencies figure out which programs a project can actually
                win, then write and package the submission to score against the published rubric.
                ATP, HSIP, CRP, CMAQ, and the FTA formula grants, from a planner who has delivered
                across Northern California.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=grant-strategy">
                    Request grant intake <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/funding-readiness-scorecard">Try the readiness scorecard</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 w-full max-w-md lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full">
                <Image
                  src="/images/site/drone-mainstreet-parking-2026-03.jpg"
                  alt="Aerial view of a Northern California main street, its parking, and pedestrian crossings — the kind of corridor ATP and HSIP funding targets"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Main Street corridor, aerial capture</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Caltrans · ATP / HSIP</span>
                <span className="provenance">FHWA · CRP / CMAQ</span>
                <span className="provenance">FTA · 5339 / 5311 / 5310</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Programs ─────────────────────────────────────────── */}
      <Section
        spacing="lg"
        className="border-b border-[color:var(--line)] bg-[color:var(--surface-2)]/50"
      >
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Programs I work in</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              The funding sources a Northern California corridor actually reaches.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Each program scores differently and rewards different evidence. Knowing which one a
              project fits, before you write a word, is most of the battle.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <li key={program.code} className="flex h-full flex-col bg-[color:var(--surface)] p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="data text-sm font-medium text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {program.code}
                  </span>
                  <span className="data text-[0.65rem] uppercase tracking-wider text-[color:var(--muted)]">
                    {program.agency}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[color:var(--ink)]">
                  {program.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{program.body}</p>
              </li>
            ))}

            {/* Fills the eighth cell and routes an unsure buyer to the scorecard */}
            <li className="flex h-full flex-col justify-center gap-3 bg-[color:var(--surface)] p-6">
              <span className="data text-xs text-[color:var(--muted)]">Not sure which fits?</span>
              <p className="text-sm leading-6 text-[color:var(--muted)]">
                Run the readiness scorecard first. It surfaces the gaps a reviewer would catch.
              </p>
              <Link
                href="/funding-readiness-scorecard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                Score my project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">What you get</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Four pieces, in the order a submission needs them.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              You can take the whole set or start with the fit matrix. The point is a submission
              that is complete, scored to the rubric, and hard to knock out on a technicality.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item, i) => (
              <li key={item.title} className="surface-card flex flex-col p-6">
                <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Honesty ──────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="surface-inset p-7 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
              <div>
                <p className="index-label">Straight talk</p>
                <h2 className="display-3 mt-4 text-[color:var(--ink)]">
                  No one can guarantee an award.
                </h2>
              </div>
              <div className="measure-wide space-y-4 text-[color:var(--muted)]">
                <p>
                  Scoring is competitive, cycles are oversubscribed, and part of every outcome sits
                  outside anyone&rsquo;s control. I will not tell you otherwise, and I would be
                  careful with anyone who does.
                </p>
                <p>
                  What I control is the submission: complete, scored against the published rubric,
                  defensible on the numbers, and not lost on a formatting or eligibility
                  technicality. If a program is a poor fit, I will say so before you spend a cycle
                  on it.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Closing / CTA ────────────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Start here</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Tell me what you&rsquo;re trying to fund.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Send the project and the deadline you&rsquo;re working toward. I&rsquo;ll tell you
              which programs are worth a submission and what the package needs. No sales team, just a
              scoping conversation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="/contact?intent=discovery&topic=grant-strategy">
                  Request grant intake <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/funding-readiness-scorecard">Try the readiness scorecard</Link>
              </Button>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                nathaniel@natfordplanning.com
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a className="provenance" href="/Funding_Readiness_Scorecard_Worksheet.pdf">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Readiness worksheet (PDF)
              </a>
              <Link className="provenance" href="/services">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                All services
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
