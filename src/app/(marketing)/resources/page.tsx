'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  ClipboardCheck,
  Download,
  FileText,
  Search,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ContourField } from '@/components/features/contour-field'

const fundingPrograms = [
  {
    program: 'Active Transportation Program (ATP)',
    agency: 'California Transportation Commission (CTC)',
    category: 'Bike/Ped, SRTS, Planning/Capital',
    cycle: 'Biennial; Call ~Spring/Summer; Awards ~Winter',
    nextWindow: '2026 Cycle – Call ~Spring/Summer (TBD)',
    localMatch: 'Varies; disadvantaged communities often exempt',
    notes: 'Score emphasis on safety, equity, connectivity, and school access.',
  },
  {
    program: 'Highway Safety Improvement Program (HSIP)',
    agency: 'Caltrans/CTC',
    category: 'Systemic + spot safety projects',
    cycle: 'Every ~2 years',
    nextWindow: '2026 (TBD)',
    localMatch: '10% typical',
    notes: 'Requires crash-data-backed countermeasure justification.',
  },
  {
    program: 'Carbon Reduction Program (CRP)',
    agency: 'Caltrans/CTC/MPOs',
    category: 'VMT and emissions reduction',
    cycle: 'Annual/Biennial by region',
    nextWindow: 'Regional windows 2025–2026 (TBD)',
    localMatch: 'Varies',
    notes: 'Strong quantifiable GHG/VMT logic materially improves competitiveness.',
  },
  {
    program: 'FTA Section 5339 Bus & Bus Facilities',
    agency: 'Federal Transit Administration',
    category: 'Transit capital and facilities',
    cycle: 'Annual NOFO',
    nextWindow: '2026 NOFO ~Q1–Q2 (TBD)',
    localMatch: '20% typical',
    notes: 'Narrative strength around state-of-good-repair and transition readiness is critical.',
  },
  {
    program: 'Safe Streets and Roads for All (SS4A)',
    agency: 'U.S. DOT',
    category: 'Comprehensive safety action plans + implementation grants',
    cycle: 'Annual NOFO',
    nextWindow: '2026 NOFO (TBD)',
    localMatch: '20% typical (implementation)',
    notes: 'Strong roadway safety problem statements and measurable outcomes are essential.',
  },
  {
    program: 'Tribal Transportation Program (TTP)',
    agency: 'FHWA / BIA',
    category: 'Tribal transportation planning + construction',
    cycle: 'Formula + competitive components',
    nextWindow: 'Annual/Fiscal cycle (varies)',
    localMatch: 'Varies by program component',
    notes: 'Align project scope with tribal priorities, safety outcomes, and long-term O&M feasibility.',
  },
]

const scorecardFacts = [
  { label: 'Questions', value: '10' },
  { label: 'Output', value: 'Readiness band' },
  { label: 'Formats', value: 'Web + PDF' },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredPrograms = fundingPrograms.filter(
    (program) =>
      program.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.agency.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Resources</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Funding intelligence, free to take.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                A working grant calendar for federal and California programs, a ten-question
                readiness scorecard, and the current capability one-pager. Read them here, or
                download them and work offline. No form wall.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/funding-readiness-scorecard">
                    Open the scorecard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/NFPA_Capability_OnePager.pdf" download>
                    <Download className="h-4 w-4" aria-hidden="true" /> Capability one-pager
                  </a>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down aerial capture of an intersection used for planning and safety analysis"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. R1 · Intersection, top-down</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Northern California</span>
                <span className="provenance">Aerial capture</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Downloads ────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Downloads</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Tools you can take with you.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Two things worth keeping on hand: a readiness self-check you can run in a few
              minutes, and the current capability sheet.
            </p>
          </div>

          {/* Featured — the scorecard */}
          <article className="surface-card mt-10 overflow-hidden">
            <div className="grid lg:grid-cols-[1.28fr_0.72fr]">
              <div className="p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <ClipboardCheck
                    className="h-5 w-5 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                    aria-hidden="true"
                  />
                  <span className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    Interactive tool
                  </span>
                </div>
                <h3 className="display-3 mt-3 text-[color:var(--ink)]">
                  Funding Readiness Scorecard
                </h3>
                <p className="measure mt-4 text-[color:var(--muted)]">
                  Answer ten questions about your project, your data, and your match. You get a
                  readiness band and a plain read on what to shore up before you write a word of
                  narrative. The worksheet PDF mirrors the questions for offline review.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/funding-readiness-scorecard">
                      Open the scorecard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href="/Funding_Readiness_Scorecard_Worksheet.pdf"
                    download
                    className="btn btn-outline btn-md"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" /> Worksheet PDF
                  </a>
                </div>
              </div>

              <dl className="flex flex-col justify-center gap-3.5 border-t border-[color:var(--line)] bg-[color:var(--surface-2)]/50 p-7 md:p-9 lg:border-l lg:border-t-0">
                {scorecardFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] pb-3.5 last:border-0 last:pb-0"
                  >
                    <dt className="label">{fact.label}</dt>
                    <dd className="data text-sm text-[color:var(--ink)]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* The capability one-pager */}
          <article className="surface-card mt-5 p-7 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <FileText
                    className="h-5 w-5 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                    aria-hidden="true"
                  />
                  <span className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    PDF · Capability sheet
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[color:var(--ink)]">
                  Capability One-Pager
                </h3>
                <p className="measure mt-3 text-[color:var(--muted)]">
                  A one-page service overview. It states plainly that the representative project
                  experience it references was completed at Green DOT Transportation Solutions,
                  as a Senior Transportation Planner and Project Manager over roughly four years,
                  not as Nat Ford Planning.
                </p>
              </div>
              <div className="flex md:justify-end">
                <a
                  href="/NFPA_Capability_OnePager.pdf"
                  download
                  className="btn btn-outline btn-md"
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
                </a>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* ── Grant funding calendar ───────────────────────────── */}
      <Section
        spacing="lg"
        className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50"
      >
        <Container size="lg">
          <div className="mx-auto max-w-5xl">
            <p className="index-label">Grant calendar</p>
            <div className="mt-5 flex items-start gap-3">
              <Calendar
                className="mt-1.5 h-7 w-7 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                aria-hidden="true"
              />
              <h2 className="display-2 text-[color:var(--ink)]">
                Federal and California funding programs.
              </h2>
            </div>
            <p className="measure-wide mt-5 text-[color:var(--muted)]">
              The programs I see most in rural and small-agency work. I work nationwide, so this
              maps to your state, tribal, county or county-equivalent, RTPA, transportation
              commission, or MPO context on request.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-[color:var(--muted)]">
              Dates are indicative. Confirm the current call or NOFO window with the
              administering agency before you plan around it.
            </p>

            <div className="relative mt-8 max-w-md">
              <label htmlFor="program-search" className="sr-only">
                Search programs
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]"
                aria-hidden="true"
              />
              <Input
                id="program-search"
                type="text"
                placeholder="Search programs, agencies, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <p aria-live="polite" className="data mt-2 text-xs text-[color:var(--muted)]">
              {filteredPrograms.length} of {fundingPrograms.length} programs shown
            </p>

            {filteredPrograms.length > 0 ? (
              <ul className="mt-6 space-y-4">
                {filteredPrograms.map((program) => (
                  <li key={program.program}>
                    <article className="surface-card p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                            {program.program}
                          </h3>
                          <p className="data mt-1 text-xs uppercase tracking-wider text-[color:var(--muted)]">
                            {program.agency}
                          </p>
                        </div>
                        <span className="data inline-flex max-w-full items-center self-start rounded-md border border-[color:var(--line)] bg-[color:var(--surface)] px-2.5 py-1 text-xs text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                          {program.nextWindow}
                        </span>
                      </div>

                      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <dt className="label">Category</dt>
                          <dd className="mt-1 text-sm text-[color:var(--foreground)]/85">
                            {program.category}
                          </dd>
                        </div>
                        <div>
                          <dt className="label">Cycle</dt>
                          <dd className="mt-1 text-sm text-[color:var(--foreground)]/85">
                            {program.cycle}
                          </dd>
                        </div>
                        <div>
                          <dt className="label">Local match</dt>
                          <dd className="mt-1 text-sm text-[color:var(--foreground)]/85">
                            {program.localMatch}
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm leading-6 text-[color:var(--muted)]">
                        <span className="label mr-1.5 align-baseline">Notes</span>
                        {program.notes}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="surface-card mt-6 p-10 text-center text-[color:var(--muted)]">
                No programs match &ldquo;{searchTerm}&rdquo;.
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* ── Closing / grant strategy ─────────────────────────── */}
      <section className="on-dark relative overflow-hidden bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="index-label text-[color:var(--copper)]">Grant strategy</p>
            <h2 className="display-2 mt-5 text-white">Turn this into a submission plan.</h2>
            <p className="mt-5 text-white/70">
              If you want a partner to prioritize the right programs, shape the narrative, and
              build a plan your team can actually execute, that is the grant work I do.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/services/grants">
                  Grant services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact?intent=discovery">Talk to Nat</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
