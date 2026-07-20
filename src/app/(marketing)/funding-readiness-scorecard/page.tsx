import Link from 'next/link'
import { ArrowRight, ClipboardList, Download, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { FundingReadinessScorecard } from '@/components/features/funding-readiness-scorecard'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import {
  fundingReadinessBands,
  fundingReadinessCommonGaps,
  fundingReadinessQuestions,
} from '@/data/funding-readiness-scorecard'

const domains = Array.from(new Set(fundingReadinessQuestions.map((question) => question.domain)))

const whatItIs = [
  'A 10-question check grounded in real application packaging work.',
  'Plain-English readiness bands: Needs Foundation Work, Almost Ready, Ready to Pursue.',
  'A way to align staff internally before you spend scarce time on a live funding window.',
]

export const metadata: Metadata = {
  title: 'Funding Readiness Scorecard',
  description:
    'A practical self-check for agencies, tribes, counties, and RTPAs to assess whether a transportation project package is ready for a focused funding push.',
}

export default function FundingReadinessScorecardPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="index-label reveal reveal-1">Resource · Grants &amp; funding</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Funding Readiness Scorecard
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                A practical self-check for rural agencies, small towns, counties, RTPAs, transportation
                commissions, and tribal governments that need to know whether a project package is
                actually ready for a funding push.
              </p>
              <div className="reveal reveal-4 mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#scorecard">
                    Start the scorecard <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/Funding_Readiness_Scorecard_Worksheet.pdf" download>
                    <Download className="h-4 w-4" />
                    Download worksheet
                  </a>
                </Button>
              </div>
              <p className="data reveal reveal-5 mt-7 text-xs text-[color:var(--muted)]">
                10 questions · 20 points · 3 readiness bands
              </p>
            </div>

            {/* What this is — a report plate, not a heading */}
            <div className="surface-card reveal reveal-5 p-6 md:p-7 lg:justify-self-end">
              <p className="label">What this is</p>
              <ul className="mt-4 space-y-3.5">
                {whatItIs.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[color:var(--muted)]">
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How to use it + the one honest caveat ────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">How to use it</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Pressure-test the package before the deadline pressure hits.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                The scorecard surfaces avoidable weakness early: fuzzy scope, shaky cost logic,
                unorganized evidence, unclear approvals, or missing narrative support. Run it with the
                staff who own each piece and you will know where the real gaps are before a deadline
                forces the question.
              </p>

              <div className="surface-inset mt-7 max-w-xl p-5">
                <p className="label">One honest caveat</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--foreground)]/85">
                  A high score is not a guarantee of funding. This is a self-check, not a ruling on
                  grant eligibility, regulatory sufficiency, or award likelihood. It tells you whether
                  the package is organized enough to defend, and what to fix first.
                </p>
              </div>
            </div>

            <div>
              <p className="label">Domains covered</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {domains.map((domain) => (
                  <li
                    key={domain}
                    className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-1.5 text-sm font-medium text-[color:var(--ink)]"
                  >
                    {domain}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="label">Common gaps we see</p>
                <ul className="mt-4 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                  {fundingReadinessCommonGaps.map((gap) => (
                    <li key={gap} className="flex items-start gap-3 py-4 text-sm leading-6 text-[color:var(--muted)]">
                      <ClipboardList
                        className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                        aria-hidden="true"
                      />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Result bands ─────────────────────────────────────── */}
      <Section spacing="lg" className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Result bands</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Three outcomes, one clear next step.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Score each question the same way, then read your total against these bands. Each one comes
              with the move that matters most from where you stand.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {fundingReadinessBands.map((band, i) => (
              <li key={band.name} className="surface-card flex flex-col p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="data text-xs text-[color:var(--muted)]">{band.rangeLabel}</span>
                </div>
                <h3 className="display-3 mt-3 text-[color:var(--ink)]">{band.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{band.summary}</p>
                <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm leading-6 text-[color:var(--foreground)]/85">
                  {band.guidance}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Interactive scorecard ────────────────────────────── */}
      <Section id="scorecard" spacing="xl" className="worksurface border-b border-[color:var(--line)]">
        <Container size="xl">
          <div className="mb-10 max-w-2xl">
            <p className="index-label">Interactive self-assessment</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">Score your current package.</h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Answer each question using the same standard: not in place, partial, or ready. Once you
              finish, you will see your current readiness band and a recommended next move.
            </p>
          </div>

          <FundingReadinessScorecard />
        </Container>
      </Section>

      {/* ── Worksheet + closing CTA ──────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="surface-card flex flex-col p-7 md:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--surface-2)] text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="display-3 mt-5 text-[color:var(--ink)]">Keep an offline copy.</h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                Prefer to mark it up in a board packet prep meeting or route it to staff for review? The
                worksheet PDF carries the same ten questions and result bands, plus notes space for
                ownership, missing evidence, and next actions.
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <a href="/Funding_Readiness_Scorecard_Worksheet.pdf" download>
                    <Download className="h-4 w-4" />
                    Download worksheet PDF
                  </a>
                </Button>
              </div>
            </article>

            <article className="surface-card flex flex-col p-7 md:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--surface-2)] text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="display-3 mt-5 text-[color:var(--ink)]">
                Want a tighter view of what to fix first?
              </h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                Nat Ford can turn your score into a focused action plan: what to define, what evidence to
                organize, and what pieces need to be submission-ready before the next funding window.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact/funding-readiness">
                    Request a review <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services/grants">View grant services</Link>
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  )
}
