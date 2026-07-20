import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sierra County RTP — Planning Experience',
  description:
    'A regional transportation plan for a high-elevation rural county: SWITRS/HPMS/ACS data on a PostGIS model, defensible performance targets, and a fiscally constrained project list aligned to SB-1, IIJA, and SHOPP. Prior-role work at Green DOT Transportation Solutions.',
}

const facts = [
  { label: 'Planning period', value: '10 years' },
  { label: 'Project list', value: 'Fiscally constrained' },
  { label: 'Funding sources', value: 'SB-1 · IIJA · SHOPP' },
  { label: 'Performance areas', value: 'Safety · Preservation · Access' },
]

const approach = [
  {
    heading: 'Integrate the data on one model',
    body: 'ACS and DOF growth trends, HPMS traffic volumes, SWITRS collision records, and the maintenance backlog went into a single PostGIS model, so every target and score traced back to a source instead of a slide.',
    sources: ['SWITRS', 'HPMS', 'ACS / DOF', 'PostGIS'],
  },
  {
    heading: 'Pressure-test targets on a live map',
    body: 'Mapbox GL views and lean dashboards let county staff and decision-makers see targets and funding scenarios spatially, and push back on them, before anything went to the board.',
    sources: ['Mapbox GL JS'],
  },
  {
    heading: 'Tie every project to funding',
    body: 'Each project got a narrative tied to a measurable outcome, safety, preservation, or access, and matched to the program most likely to fund it: SB-1, IIJA, or SHOPP coordination with Caltrans.',
    sources: ['SB-1', 'IIJA', 'SHOPP'],
  },
]

const outputs = [
  'Performance-target tables with defensible baselines and 10-year goals.',
  'A fiscally constrained project list prioritized by transparent scoring criteria.',
  'Grant-ready narratives tied to measurable safety, preservation, and access outcomes.',
  'An interactive web map for public engagement and stakeholder coordination.',
]

export default function SierraRTPCaseStudy() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField className="opacity-80" />
        <Container size="xl" className="relative py-14 md:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to projects
            </Link>
          </Button>

          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="index-label">Prior employment · Regional Transportation Plan</p>
              <h1 className="display-1 mt-6 text-[color:var(--ink)]">
                Sierra County RTP: targets and a funding path that hold up.
              </h1>
              <p className="lead measure-wide mt-6 text-[color:var(--muted)]">
                A data-driven regional transportation plan for a high-elevation rural county,
                built to survive a board hearing and a Caltrans review. This work was completed
                in my prior role at Green DOT Transportation Solutions, not as a Nat Ford client
                engagement. It is here for technical context.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="provenance">Sierra County, CA · 2024</span>
                <span className="provenance">Transportation planning</span>
                <span className="provenance">GIS analysis</span>
                <span className="provenance">Funding strategy</span>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="w-full max-w-md lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full">
                <Image
                  src="/images/site/drone-corridor-valley-2026-03.jpg"
                  alt="Aerial view of a rural highway corridor threading through a high-elevation Northern California valley"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Rural Sierra corridor</span>
                  <span className="text-[color:var(--copper)]">Representative</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Fact strip ───────────────────────────────────────── */}
      <Section spacing="sm" className="border-b border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-[color:var(--surface)] p-6">
                <dt className="label">{fact.label}</dt>
                <dd className="data mt-2 text-lg font-medium text-[color:var(--ink)]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ── Context + Challenge ──────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="index-label">Context</p>
              <h2 className="display-3 mt-5 text-[color:var(--ink)]">The setting</h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                A rural, high-elevation county with aging infrastructure, thin transit, and
                seasonal tourism pressure. Sierra County needed a clear way to keep its existing
                transportation assets in good repair while addressing safety and improving access
                for residents and visitors, all on a budget that leaves no room for guessing.
              </p>
            </div>

            <div className="surface-card p-7 md:p-9">
              <p className="index-label">Challenge</p>
              <h2 className="display-3 mt-5 text-[color:var(--ink)]">The hard part</h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Set realistic performance targets and a prioritized investment path under tight
                fiscal constraints. That meant defensible project-selection criteria and clear
                alignment with the state and federal programs most likely to fund the work, so
                competitive applications could stand on evidence instead of hope.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Approach ─────────────────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Approach</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Three moves, in the order they had to happen.
            </h2>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {approach.map((step, i) => (
              <li key={step.heading} className="surface-card flex flex-col p-6 md:p-7">
                <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--ink)]">
                  {step.heading}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[color:var(--muted)]">{step.body}</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[color:var(--line)] pt-4">
                  {step.sources.map((source) => (
                    <span key={source} className="provenance">
                      {source}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Outputs + Outcomes ───────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">Outputs</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">What the county walked away with.</h2>
              <ul className="mt-8 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                {outputs.map((output) => (
                  <li key={output} className="grid grid-cols-[0.75rem_1fr] gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[color:var(--copper)]"
                    />
                    <span className="text-[color:var(--foreground)]/85">{output}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="index-label">Outcomes</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">Where it left the program.</h2>
              <p className="measure mt-6 text-[color:var(--muted)]">
                A clear 10-year roadmap aligning projects with the funding sources most likely to
                move them, SB-1, IIJA, and SHOPP coordination. That tightened alignment between the
                board and Caltrans District 2 and shortened the runway on near-term applications.
              </p>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Because the analysis lived on a reproducible PostGIS model rather than a one-off
                spreadsheet, the documentation was audit-ready and the workflow could be re-run for
                annual updates as funding opportunities shift.
              </p>

              <div className="surface-card mt-8 p-6 md:p-7">
                <p className="index-label">Project role</p>
                <p className="mt-4 text-[color:var(--foreground)]/85">
                  Lead author and GIS analysis, working with Sierra County transportation staff and
                  Caltrans District 2 partners. Completed while I was a Senior Transportation Planner
                  and Project Manager at Green DOT Transportation Solutions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-t border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="index-label text-[color:var(--copper)]">Planning support</p>
            <h2 className="display-2 mt-5 text-white">Working on an RTP, ATP, or CIP?</h2>
            <p className="mt-5 text-white/70">
              This is the kind of work I do: turn the data a county already has into targets, a
              defensible project list, and grant narratives that match the money. If that is on your
              desk, tell me where it stands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact?intent=discovery&topic=planning-support">
                  Talk through your plan <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">See more project experience</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
