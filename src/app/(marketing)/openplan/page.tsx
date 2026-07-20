import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Gauge,
  Github,
  Map as MapIcon,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import {
  implementationOffers,
  licenseLabel,
  openSourceProjects,
  readinessLabel,
  readinessNote,
  sourceAvailabilityLabel,
} from '@/data/open-source-projects'

export const metadata: Metadata = {
  title: 'OpenPlan',
  description:
    'OpenPlan is free, open-source planning software: a living map behind every screen, grant narratives grounded to verifiable facts, a CEQA §15064.3 VMT screen, and a Planner Agent that acts only through audited, single-use approvals.',
}

const capabilities = [
  {
    icon: MapIcon,
    heading: 'A living map behind every screen',
    body: 'Projects, corridors, RTP cycles, equity tracts, and public comments are layers you click, not static exhibits. The map is the worksurface, not a screenshot pasted into a report.',
  },
  {
    icon: FileCheck2,
    heading: 'Grant narratives that ground every fact',
    body: 'The narrative drafter grounds every factual sentence to a verifiable workspace fact. Sentences it cannot ground get flagged, so a reviewer sees exactly what still needs a source before it goes to a funder.',
  },
  {
    icon: Gauge,
    heading: 'A CEQA §15064.3 VMT screen with a statutory memo',
    body: 'Run a vehicle-miles-traveled screen over live Census and OSM data, then export a §15064.3 memo you can attach to the record.',
  },
  {
    icon: ShieldCheck,
    heading: 'A Planner Agent that keeps a ledger',
    body: 'The agent is grounded in your workspace and acts only through hash-verified, single-use, time-limited approvals. Every action lands on a visible audit ledger.',
  },
]

const fitProfiles = [
  'Rural RTPAs, counties, tribes, and transportation commissions',
  'Small and mid-sized public agencies under real delivery pressure',
  'Consultants supporting county, regional, and tribal planning work',
  'Lean teams that need continuity, auditability, and follow-through',
]

const goodFitSignals = [
  'You have active projects, recurring meetings, and real handoffs to keep straight.',
  'You want continuity across project state, maps, risks, grants, and reporting.',
  'You are comfortable running open-source software you can fork and adapt.',
]

const faqItems = [
  {
    question: 'Is OpenPlan free?',
    answer:
      'Yes. The code is public under Apache-2.0. You can inspect it, fork it, or self-host it. The paid side is managed deployment, a custom agency edition, onboarding, and support.',
  },
  {
    question: 'What is OpenPlan?',
    answer:
      'Planning software that keeps projects, funding, maps, reports, and evidence on one spine, with a living map behind every screen and provenance on every number.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Rural RTPAs, counties, tribes, and transportation commissions; small and mid-sized public agencies; and consultants supporting regional planning work.',
  },
  {
    question: 'How is it different from a dashboard?',
    answer:
      'A dashboard reports status. OpenPlan holds the context: project state, map, decisions, grants, and evidence stay connected, so the next decision arrives with its sources attached.',
  },
  {
    question: 'What does the AI actually do?',
    answer:
      'It drafts grant narratives grounded to workspace facts, and it runs a Planner Agent. The agent acts only through hash-verified, single-use, time-limited approvals, and every action is on a visible audit ledger. It supports review; it does not replace it.',
  },
  {
    question: 'Can it run a CEQA VMT screen?',
    answer:
      'Yes. It runs a §15064.3 vehicle-miles-traveled screen over live Census and OSM data and exports a statutory memo. It is screening-grade, built to support qualified planning review, not a calibrated travel-demand forecast.',
  },
  {
    question: 'Why open source it?',
    answer:
      'Agencies should not keep paying, separately and invisibly, for the same planning scaffolding. Open code is inspectable and forkable, so a county can adapt it instead of waiting on a vendor to guess every edge case.',
  },
  {
    question: 'Can Nat Ford run it for us?',
    answer:
      'Yes. That is the paid offer: managed deployment, a custom county or agency edition, data setup, staff onboarding, and a support lane for when it has to work on a deadline.',
  },
]

export default function OpenPlanPage() {
  const openplan = openSourceProjects.find((project) => project.slug === 'openplan')!

  const register = [
    { label: 'Readiness', value: readinessLabel(openplan.status) },
    { label: 'License', value: licenseLabel(openplan) },
    { label: 'Source', value: sourceAvailabilityLabel(openplan) },
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Open-source planning software</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                An operating system for a planning department.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                OpenPlan puts projects, funding, maps, reports, and evidence on one spine, with the
                map as the worksurface and provenance on every number. The code is public. You can
                read it, fork it, or run it yourself before we ever talk.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact/openplan-fit?tier=Open-source%20fit%20audit">
                    Discuss OpenPlan fit <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={openplan.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> Read the source
                </a>
                {openplan.demoUrl ? (
                  <a
                    href={openplan.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-2 text-[0.95rem] font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--pine)] dark:hover:text-[color:var(--pine-soft)]"
                  >
                    See the live demo
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-town-overview-2026-03.jpg"
                  alt="Aerial overview of a small Northern California town and its street grid"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · The department, on one map</span>
                  <span className="text-[color:var(--copper)]">OpenPlan</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={openplan.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  {openplan.licenseSpdx} · openplan
                </a>
                {openplan.demoUrl ? (
                  <a
                    href={openplan.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="provenance"
                  >
                    Live demo
                  </a>
                ) : null}
              </div>
            </figure>
          </div>

          {/* Data register — every number carries its source */}
          <dl className="relative mt-14 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {register.map((item) => (
              <div key={item.label} className="bg-[color:var(--surface)] p-5">
                <dt className="label">{item.label}</dt>
                <dd className="data mt-2 text-lg text-[color:var(--ink)]">{item.value}</dd>
              </div>
            ))}
            <a
              href={`${openplan.repoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-center gap-2 bg-[color:var(--surface)] p-5 transition-colors hover:bg-[color:var(--surface-2)]"
            >
              <span className="label">Roadmap</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]">
                Issues &amp; open work
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </dl>
          <p className="relative mt-4 text-sm text-[color:var(--muted)]">{readinessNote(openplan.status)}</p>
        </Container>
      </section>

      {/* ── What it does (the capabilities) ──────────────────── */}
      <section className="on-dark relative overflow-hidden border-b border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label text-[color:var(--copper)]">What it does</p>
              <h2 className="display-2 mt-5 text-white">
                Projects, funding, reports, and evidence on one spine.
              </h2>
              <p className="mt-5 text-white/70">
                OpenPlan is not another dashboard. It puts the whole planning department on one map,
                where analysis, funding records, and reporting stay attached to the work instead of
                scattering into email and screenshots.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={openplan.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> Read the source
                </a>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2">
              {capabilities.map((cap) => {
                const Icon = cap.icon
                return (
                  <li key={cap.heading} className="bg-[#0b120f] p-6">
                    <Icon className="h-5 w-5 text-[color:var(--copper)]" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl font-semibold text-white">
                      {cap.heading}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-white/65">{cap.body}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Who it's for ─────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">Who it&rsquo;s for</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Built for lean teams that need continuity.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                OpenPlan is shaped around real delivery rhythm: what is the project, what changed,
                what is blocked, and what evidence supports the next move.
              </p>
              <ul className="mt-6 space-y-3">
                {goodFitSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                      aria-hidden="true"
                    />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {fitProfiles.map((profile) => (
                <li key={profile} className="flex items-start gap-3 bg-[color:var(--surface)] p-6">
                  <MapIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]"
                    aria-hidden="true"
                  />
                  <span className="text-[color:var(--foreground)]/85">{profile}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Use it free, hire the operators ──────────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Managed OpenPlan</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Use it free. Hire us when it has to run for your team.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              The public code is the base. The paid work is deployment, configuration, data
              migration, permissions, onboarding, support, and keeping your fork moving with the
              mainline.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {implementationOffers.map((offer) => (
              <article key={offer.name} className="surface-card p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <Wrench
                    className="mt-1 h-5 w-5 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                      {offer.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{offer.summary}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2 text-sm text-[color:var(--muted)] sm:grid-cols-2">
                  {offer.examples.map((example) => (
                    <li key={example} className="border-t border-[color:var(--line)] pt-2">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">Common questions</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Straight answers before anyone commits.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                What it is, who it fits, what stage it is in, and how the AI is kept on a leash.
              </p>
            </div>

            <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {faqItems.map((faq) => (
                <details key={faq.question} className="group py-1.5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-display text-xl font-semibold text-[color:var(--ink)]">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[color:var(--copper-ink)] transition-transform group-open:rotate-45 dark:text-[color:var(--copper)]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="measure pb-5 text-[color:var(--muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Closing ──────────────────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-t border-[color:var(--line)]">
        <Container size="xl">
          <div className="surface-card overflow-hidden p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="index-label">Get started</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Want OpenPlan without becoming the deployment team?
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Start with a fit audit. The honest first answer is sometimes not to build it. From
                there the work only goes as far as it needs to: managed deployment, a custom edition,
                data setup, onboarding, or a support lane.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild size="lg">
                  <Link href="/contact/openplan-fit?tier=Open-source%20fit%20audit">
                    Discuss OpenPlan fit <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={openplan.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> Read the source
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href="mailto:nathaniel@natfordplanning.com"
                  className="font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                >
                  nathaniel@natfordplanning.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
