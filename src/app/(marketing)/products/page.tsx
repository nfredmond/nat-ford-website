import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, CircleDot, ExternalLink, GitFork, Github, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { SectionEndCTA } from '@/components/features/section-end-cta'
import { ContourField } from '@/components/features/contour-field'
import {
  implementationOffers,
  implementationPackages,
  licenseLabel,
  openSourceProjects,
  readinessLabel,
  readinessNote,
  sourceAvailabilityLabel,
  supportCtaForProject,
} from '@/data/open-source-projects'

export const metadata: Metadata = {
  title: 'Products & Source Projects',
  description:
    'The full catalog of Nat Ford planning, geospatial, aerial, modeling, operations, and AI builds, with source status, licenses, and support options.',
}

const principles = [
  {
    title: 'Inspect where public',
    body: 'Public repositories let your team, and your AI tools, read the method and run the code before any call happens.',
  },
  {
    title: 'Fork it and make it yours',
    body: 'Fork the base and shape it to your county, RTPA, or firm. A real custom edition beats a generic plugin every time.',
  },
  {
    title: 'Support when it goes to production',
    body: 'Paid work starts when uptime, governance, training, security, and data migration have to be somebody’s job.',
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="index-label reveal reveal-1">Software catalog · source · support</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Open tools you can inspect. Support when the work gets serious.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                {openSourceProjects.length} builds across planning, GIS, aerial capture, modeling,
                operations, and planner training. Open the source where it is public, read the
                license, and fork what fits. Hire Nat Ford when you need deployment, a custom fork,
                onboarding, or a support lane.
              </p>
              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?topic=open-source-support&intent=discovery">
                    Scope implementation support <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/open-source">Read the open-source position</Link>
                </Button>
              </div>
            </div>

            {/* Catalog index — a mono table of contents that deep-links each entry */}
            <nav aria-label="Catalog index" className="reveal reveal-5 surface-card p-5 lg:justify-self-end lg:max-w-sm">
              <div className="flex items-baseline justify-between">
                <p className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  Catalog index
                </p>
                <span className="data text-xs text-[color:var(--muted)]">
                  {String(openSourceProjects.length).padStart(2, '0')} projects
                </span>
              </div>
              <ul className="mt-3 divide-y divide-[color:var(--line)]">
                {openSourceProjects.map((project) => (
                  <li key={project.slug}>
                    <a
                      href={`#${project.slug}`}
                      className="group flex items-center justify-between gap-4 py-2.5"
                    >
                      <span className="text-sm font-medium text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--pine)] dark:group-hover:text-[color:var(--pine-soft)]">
                        {project.name}
                      </span>
                      <span className="data shrink-0 text-[0.7rem] uppercase tracking-wider text-[color:var(--muted)]">
                        {readinessLabel(project.status)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* ── How source + support works ───────────────────────── */}
      <Section spacing="md" className="border-b border-[color:var(--line)]">
        <Container size="xl">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-3">
            {principles.map((principle, i) => (
              <li key={principle.title} className="bg-[color:var(--surface)] p-6">
                <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold text-[color:var(--ink)]">
                  {principle.title}
                </h2>
                <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">{principle.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── The catalog register ─────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The catalog</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Everything Nat Ford is building on.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Where a repository is public, it is linked. Where a release is still being finished,
              the status label says so.
            </p>
          </div>

          <ul className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {openSourceProjects.map((project, i) => {
              const supportCta = supportCtaForProject(project)
              const num = String(i + 1).padStart(2, '0')

              return (
                <li
                  key={project.slug}
                  id={project.slug}
                  className="scroll-mt-28 grid gap-6 py-10 md:grid-cols-[2.75rem_1fr] md:gap-8"
                >
                  <div aria-hidden="true" className="hidden md:block">
                    <span className="data text-lg text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                      {num}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="label">{project.category}</span>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
                      <span className="label">{readinessLabel(project.status)}</span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="display-3 text-[color:var(--ink)]">{project.name}</h3>
                      {project.slug === 'openplan' ? (
                        <Link
                          href="/openplan"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                        >
                          Explore OpenPlan <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="provenance">{licenseLabel(project)}</span>
                      <span className="provenance">{sourceAvailabilityLabel(project)}</span>
                      <span className="provenance">
                        {project.contributionPath ?? 'GitHub issues / forks'}
                      </span>
                    </div>

                    <p className="measure-wide mt-5 text-[color:var(--muted)]">{project.summary}</p>
                    <p className="measure-wide mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {readinessNote(project.status)}
                    </p>

                    <div className="mt-6 grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
                      <div>
                        <p className="label">Useful primitives</p>
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {project.primitives.map((primitive) => (
                            <li
                              key={primitive}
                              className="data rounded-md border border-[color:var(--line)] bg-[color:var(--surface)] px-2 py-1 text-xs text-[color:var(--muted)]"
                            >
                              {primitive}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label">Hire Nat Ford for</p>
                        <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">
                          {project.paidSupport}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-xs leading-5 text-[color:var(--muted)]">
                      {project.licenseNote}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <Button asChild size="sm">
                        <Link href={supportCta.href}>
                          {supportCta.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>

                      {project.repoUrl ? (
                        <>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                          >
                            <Github className="h-4 w-4" aria-hidden="true" /> Source
                          </a>
                          <a
                            href={`${project.repoUrl}/fork`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                          >
                            <GitFork className="h-4 w-4" aria-hidden="true" /> Fork
                          </a>
                          <a
                            href={`${project.repoUrl}/issues`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                          >
                            <CircleDot className="h-4 w-4" aria-hidden="true" /> Issues
                          </a>
                        </>
                      ) : (
                        <Link
                          href={`/contact?intent=discovery&topic=custom-software&product=${encodeURIComponent(project.slug)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                        >
                          Discuss implementation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ── Implementation — packages + offers ───────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Working together</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Free software still needs operators.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Most teams do not stall because the code was unavailable. They stall because nobody
              owned deployment, data quality, permissions, training, and the last-mile workflow. That
              is the paid work, and it starts wherever your team actually needs it.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {implementationPackages.map((pkg, i) => (
              <li key={pkg.name} className="surface-card flex flex-col p-6">
                <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--ink)]">
                  {pkg.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{pkg.bestFor}</p>
                <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm leading-6 text-[color:var(--foreground)]/85">
                  {pkg.deliverable}
                </p>
              </li>
            ))}
          </ol>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
            {implementationOffers.map((offer) => (
              <li key={offer.name} className="bg-[color:var(--surface)] p-6">
                <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                  {offer.name}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">{offer.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {offer.examples.map((example) => (
                    <li
                      key={example}
                      className="data rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)] px-2 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Confidentiality band ─────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-b border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-50" />
        <Container size="xl" className="relative py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="index-label text-[color:var(--copper)]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Confidentiality
              </p>
              <h2 className="display-2 mt-5 text-white">Public code, private client work.</h2>
              <p className="measure-wide mt-5 text-white/70">
                I publish reusable code, methods, schemas, templates, and demo data. Client
                confidential information, credentials, and internal operational details stay out of
                the repositories and stay with you. Open source is about the method, not your data.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact?intent=discovery&topic=open-source-support">
                Talk about a supported deployment <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <SectionEndCTA
        heading="Bring the open-source base. We will help make it operational."
        subhead="Start with a scoped implementation conversation for a custom fork, managed deployment, data migration, staff onboarding, or support agreement."
        primary={{ label: 'Request implementation support', href: '/contact?intent=discovery&topic=open-source-support' }}
        secondary={{ label: 'Read the open-source position', href: '/open-source' }}
      />
    </>
  )
}
