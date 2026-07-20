import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  GitFork,
  Github,
  Landmark,
  Lock,
  Wrench,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ContourField } from '@/components/features/contour-field'
import {
  implementationOffers,
  implementationPackages,
  isFeaturedPublicRepo,
  licenseLabel,
  openSourceProjects,
  readinessLabel,
  readinessNote,
  sourceAvailabilityLabel,
  supportCtaForProject,
} from '@/data/open-source-projects'

export const metadata: Metadata = {
  title: 'Open Source',
  description:
    'Nat Ford builds free, open-source planning, geospatial, aerial, modeling, and operations software, then helps teams deploy, customize, and support it.',
}

const modelPillars = [
  {
    title: 'The code is public.',
    body: 'The public projects — OpenPlan, OpenGeo, ClawModeler, and more — are real repositories under Apache-2.0 or AGPL. Inspect them, fork them, or self-host before we ever talk.',
    icon: GitFork,
  },
  {
    title: 'You pay to run it well.',
    body: 'Deployment, hosting, a fork shaped to your county, roles and onboarding, and a support lane for deadline weeks. That is the paid work, and it is the part most teams actually need help with.',
    icon: Wrench,
  },
  {
    title: 'Building blocks, not one giant app.',
    body: 'The useful unit is usually a component, schema, or workflow that agents and people can recombine. Reusable primitives beat a closed monolith with every feature bolted on.',
    icon: Code2,
  },
  {
    title: 'Open source cuts duplicate public spend.',
    body: 'When agencies, counties, and tribes can reuse and verify the same methods, the software stops being paid for over and over behind separate contracts.',
    icon: Landmark,
  },
]

const featuredOpenSourceProjects = openSourceProjects.filter(isFeaturedPublicRepo)
const featuredLicenses = Array.from(
  new Set(featuredOpenSourceProjects.map((p) => p.licenseSpdx))
)

export default function OpenSourcePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="index-label reveal reveal-1">Open source by default</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Free code. Serious implementation.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                Nat Ford builds open-source planning, geospatial, aerial, modeling, and operations
                software. The tools are meant to be inspected, forked, and run by agencies,
                companies, developers, and AI agents. The paid work is making them run in your shop.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?topic=open-source-support&intent=discovery">
                    Get implementation support <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#projects">Browse featured projects</Link>
                </Button>
              </div>
            </div>

            {/* Model plate — states the open-core model plainly */}
            <div className="reveal reveal-5 surface-card p-6 md:p-7 lg:justify-self-end lg:max-w-md">
              <p className="label">The model</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight text-[color:var(--ink)]">
                The code is free. Running it well is the paid work.
              </p>
              <ul className="mt-5 space-y-2.5">
                {implementationOffers.map((offer) => (
                  <li
                    key={offer.name}
                    className="flex items-start gap-2.5 text-sm leading-6 text-[color:var(--muted)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--copper)]"
                    />
                    {offer.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-[color:var(--line)] pt-5">
                {featuredLicenses.map((license) => (
                  <span key={license} className="provenance">
                    {license}
                  </span>
                ))}
                <a
                  href="https://github.com/nfredmond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  github.com/nfredmond
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How the model works ──────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">How the model works</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Open the reusable pieces. Charge for the hard parts.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Public-interest software should be something you can read, adapt, and keep running
                when your workflow gets weird. So the software is open. The revenue comes from
                making it work in production, and from the planning judgment no repository hands you.
              </p>
            </div>

            <dl className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {modelPillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="grid gap-3 py-7 sm:grid-cols-[2.25rem_1fr] sm:gap-6"
                  >
                    <div
                      aria-hidden="true"
                      className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--pine)] dark:text-[color:var(--pine-soft)] sm:flex"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <dt className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                        {pillar.title}
                      </dt>
                      <dd className="measure mt-2.5 text-[color:var(--muted)]">{pillar.body}</dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── Featured public repositories ─────────────────────── */}
      <Section
        id="projects"
        spacing="lg"
        className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50"
      >
        <Container size="xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="index-label">Featured public repositories</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Building blocks worth forking.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[color:var(--muted)]">
              Active public repos are shown here. The full catalog, including release-track and
              commercial-guide entries, lives on the project directory.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featuredOpenSourceProjects.map((project) => {
              const supportCta = supportCtaForProject(project)
              return (
                <Card key={project.slug} id={project.slug} className="scroll-mt-28">
                  <div className="flex h-full flex-col p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          <span className="label">{project.category}</span>
                          <span className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                            {readinessLabel(project.status)}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-[color:var(--ink)]">
                          {project.name}
                        </h3>
                      </div>
                      <a
                        href={project.repoUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm shrink-0"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" /> Source
                      </a>
                    </div>

                    <p className="mt-4 text-[0.98rem] leading-7 text-[color:var(--muted)]">
                      {project.summary}
                    </p>

                    <div className="mt-5 grid gap-4 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 p-4 sm:grid-cols-2">
                      <div>
                        <p className="label">License</p>
                        <p className="data mt-1 text-sm font-medium text-[color:var(--ink)]">
                          {licenseLabel(project)}
                        </p>
                      </div>
                      <div>
                        <p className="label">Source</p>
                        <p className="data mt-1 text-sm font-medium text-[color:var(--ink)]">
                          {sourceAvailabilityLabel(project)}
                        </p>
                      </div>
                      <p className="text-[0.82rem] leading-5 text-[color:var(--muted)] sm:col-span-2">
                        {readinessNote(project.status)}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="label">Open primitives</p>
                        <ul className="mt-2.5 space-y-1.5 text-sm leading-6 text-[color:var(--muted)]">
                          {project.primitives.map((primitive) => (
                            <li key={primitive} className="flex gap-2">
                              <span aria-hidden="true" className="text-[color:var(--copper)]">
                                ·
                              </span>
                              {primitive}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label">Paid support</p>
                        <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">
                          {project.paidSupport}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 border-t border-[color:var(--line)] pt-4 text-xs leading-5 text-[color:var(--faint)]">
                      {project.licenseNote}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link
                        href={supportCta.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                      >
                        {supportCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={`${project.repoUrl!}/issues`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--pine)] dark:hover:text-[color:var(--pine-soft)]"
                      >
                        Issues &amp; roadmap
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/products">
                View full project directory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── What the paid work looks like ────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Working together</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              What you pay for, and how to start.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Adopting open source should not force a giant procurement step. Here is the shape of
              the paid work, and the smallest responsible way into each of them.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {implementationOffers.map((offer) => (
              <Card key={offer.name} className="p-6 md:p-7">
                <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                  {offer.name}
                </h3>
                <p className="mt-3 text-[color:var(--muted)]">{offer.summary}</p>
                <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
                  {offer.examples.map((example) => (
                    <li
                      key={example}
                      className="bg-[color:var(--surface)] px-3.5 py-2.5 text-sm leading-5 text-[color:var(--muted)]"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Support lanes ladder */}
          <div className="surface-inset mt-8 p-6 md:p-9">
            <div className="max-w-2xl">
              <p className="label">How to engage</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-[color:var(--ink)]">
                Choose the smallest responsible support lane.
              </h3>
              <p className="mt-3 text-[color:var(--muted)]">
                Most teams start with a fit audit, because the honest first answer is sometimes
                &ldquo;don&rsquo;t build this.&rdquo; From there the work escalates only as far as it
                needs to.
              </p>
            </div>

            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {implementationPackages.map((pkg, i) => (
                <li key={pkg.name} className="surface-card flex flex-col p-5">
                  <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-3 font-display text-lg font-semibold text-[color:var(--ink)]">
                    {pkg.name}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {pkg.deliverable}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-[color:var(--line)] pt-4 text-xs leading-5 text-[color:var(--faint)]">
                    {pkg.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-[color:var(--copper)]">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── Open does not mean careless ──────────────────────── */}
      <section className="on-dark relative overflow-hidden border-y border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <p className="index-label text-[color:var(--copper)]">Open, not careless</p>
              <h2 className="display-2 mt-5 text-white">
                We publish the reusable parts. We protect the sensitive parts.
              </h2>
              <p className="mt-5 max-w-2xl text-white/70">
                Client data, credentials, confidential deliverables, and security-sensitive
                deployment details stay protected. Reusable code, schemas, templates, demo data,
                public methods, and documentation belong in the open whenever it is practical.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 md:p-7">
              <Lock className="h-7 w-7 text-[color:var(--copper)]" aria-hidden="true" />
              <p className="mt-4 font-display text-xl font-semibold text-white">
                Trust comes from both transparency and discretion.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/65">
                The operating rule is simple: open the building blocks, and never leak
                people&rsquo;s actual work.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing ──────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="surface-card overflow-hidden">
            <div className="grid md:grid-cols-[0.72fr_1.28fr]">
              <div className="relative min-h-72 border-b border-[color:var(--line)] md:border-b-0 md:border-r">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down aerial capture of a rural intersection in Northern California"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="index-label">Bring a repo, or a problem</p>
                <h2 className="display-3 mt-4 text-[color:var(--ink)]">
                  Tell me what you want running.
                </h2>
                <p className="measure mt-4 text-[color:var(--muted)]">
                  Self-host it yourself, or have me deploy, fork, and support it. Either way the code
                  stays yours to inspect. Start with a scoping conversation and we will pick the
                  smallest lane that solves your workflow.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button asChild size="lg">
                    <Link href="/contact?intent=discovery&topic=open-source-support">
                      Get implementation support <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/products">Browse the full catalog</Link>
                  </Button>
                  <a
                    href="mailto:nathaniel@natfordplanning.com"
                    className="font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                  >
                    nathaniel@natfordplanning.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
