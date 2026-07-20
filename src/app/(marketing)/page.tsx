import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Map as MapIcon,
  Database,
  Plane,
  FileText,
  Code2,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import JsonLd from '@/components/features/json-ld'
import { ContourField } from '@/components/features/contour-field'
import { PlannerChatbot } from '@/components/features/planner-chatbot'
import organizationData from '@/data/organization.json'
import servicesData from '@/data/services.json'
import projectsData from '@/data/projects.json'
import {
  implementationPackages,
  isFeaturedPublicRepo,
  openSourceProjects,
  supportCtaForProject,
} from '@/data/open-source-projects'

const pillars = [
  {
    title: 'The tools are open.',
    body: 'OpenPlan, OpenGeo, ClawModeler, and the rest are public repositories under Apache-2.0 or AGPL. Read the code, fork it, or run it yourself before we ever talk.',
    link: { label: 'github.com/nfredmond', href: 'https://github.com/nfredmond', external: true },
  },
  {
    title: 'You pay for the parts that are hard to keep running.',
    body: 'Deployment, hosting, a custom fork for your county, staff onboarding, and a support lane for when it has to work on a deadline. That is the business.',
    link: { label: 'How the model works', href: '/open-source' },
  },
  {
    title: 'The planning is done by a planner.',
    body: 'RTPs, ATPs, VMT screening, grant narratives, and board-ready maps, from someone who has delivered them across rural Northern California.',
    link: { label: 'See the planning work', href: '/projects' },
  },
]

const openplanCapabilities = [
  {
    heading: 'A living map behind every screen',
    body: 'Projects, corridors, RTP cycles, equity tracts, and public comments are layers you can click, not static exhibits.',
  },
  {
    heading: 'Grant narratives that have to cite their facts',
    body: 'AI drafts funding narratives where every factual sentence must ground to a verifiable workspace fact. Unverified sentences get flagged.',
  },
  {
    heading: 'A CEQA VMT screen with a real memo',
    body: 'Run a §15064.3 vehicle-miles-traveled screen over live Census and OSM data and export a downloadable statutory memo.',
  },
  {
    heading: 'A planner agent that keeps a ledger',
    body: 'The copilot is grounded in your workspace and acts only through hash-verified, single-use, time-limited approvals, with every action on a visible audit log.',
  },
]

const services = [
  { name: 'Transportation planning', desc: 'RTPs, ATPs, VMT, corridor strategy, board materials', href: '/services/planning', icon: MapIcon },
  { name: 'GIS & spatial analysis', desc: 'PostGIS, web maps, data pipelines, scenario analysis', href: '/services/gis', icon: Database },
  { name: 'Aerial mapping', desc: 'FAA Part 107 drone capture, orthomosaics, terrain models', href: '/services/aerial', icon: Plane },
  { name: 'Grants & funding', desc: 'ATP, HSIP, CRP, FTA strategy, narratives, readiness reviews', href: '/services/grants', icon: FileText },
  { name: 'Custom software', desc: 'Dashboards, portals, and agent workflows for real processes', href: '/services/ai', icon: Code2 },
]

export default function HomePage() {
  const openplan = openSourceProjects.find((p) => p.slug === 'openplan')!
  const register = openSourceProjects.filter(
    (p) => isFeaturedPublicRepo(p) && p.slug !== 'openplan'
  )

  return (
    <>
      <JsonLd data={organizationData} />
      <JsonLd data={servicesData} />
      <JsonLd data={projectsData} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">
                Open-source planning · GIS · aerial · modeling
              </p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Software for planning that has to hold up in public.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                Nat Ford Planning &amp; Analysis builds free, open-source tools for transportation
                planning, mapping, and modeling, then helps small and rural agencies actually run
                them. The code is public. Every number carries its source. A real planner answers
                the email.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Talk to Nat <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/openplan">Explore OpenPlan</Link>
                </Button>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 px-2 py-2 text-[0.95rem] font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--pine)]"
                >
                  or browse all the software
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-corridor-valley-2026-03.jpg"
                  alt="Aerial view of a rural highway corridor threading through a Northern California valley"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Rural corridor, aerial capture</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://github.com/nfredmond/openplan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  Apache-2.0 · openplan
                </a>
                <span className="provenance">Sierra foothills, CA</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── The shape of the work ────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">The shape of the work</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Open the reusable pieces. Charge for the hard parts.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Public agencies should not keep paying, separately and invisibly, for the same
                software. So the software is free. The revenue comes from making it run, and from
                the planning judgment that no repository can hand you.
              </p>
            </div>

            <dl className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="grid gap-3 py-7 sm:grid-cols-[1.5rem_1fr] sm:gap-6">
                  <div aria-hidden="true" className="hidden h-1.5 w-1.5 translate-y-2.5 rounded-full bg-[color:var(--copper)] sm:block" />
                  <div>
                    <dt className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {pillar.title}
                    </dt>
                    <dd className="measure mt-2.5 text-[color:var(--muted)]">{pillar.body}</dd>
                    <div className="mt-4">
                      {pillar.link.external ? (
                        <a
                          href={pillar.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                        >
                          {pillar.link.label}
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={pillar.link.href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                        >
                          {pillar.link.label}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── Software register ────────────────────────────────── */}
      <Section spacing="lg" className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="index-label">Public repositories</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Software you can open right now.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">
                The full catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* OpenPlan — the flagship, given its own weight */}
          <article className="surface-card mt-10 overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <span className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    Flagship
                  </span>
                  <span className="data text-xs text-[color:var(--muted)]">{openplan.licenseSpdx}</span>
                </div>
                <h3 className="display-3 mt-3 text-[color:var(--ink)]">{openplan.name}</h3>
                <p className="measure mt-4 text-[color:var(--muted)]">{openplan.summary}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link href="/openplan">Explore OpenPlan</Link>
                  </Button>
                  <a
                    href={openplan.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" /> Source
                  </a>
                </div>
              </div>
              <div className="relative min-h-52 border-t border-[color:var(--line)] lg:border-l lg:border-t-0">
                <Image
                  src="/images/site/drone-town-overview-2026-03.jpg"
                  alt="Aerial overview of a small Northern California town and its street grid"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          {/* The rest — a compact register, not a grid of identical cards */}
          <ul className="mt-5 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {register.map((project) => (
              <li
                key={project.slug}
                className="grid gap-4 py-6 md:grid-cols-[minmax(0,14rem)_1fr_auto] md:items-center md:gap-8"
              >
                <div>
                  <p className="data text-[0.7rem] uppercase tracking-wider text-[color:var(--muted)]">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                    {project.name}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-[color:var(--muted)]">{project.summary}</p>
                <div className="flex items-center gap-4">
                  <span className="data hidden text-xs text-[color:var(--muted)] lg:inline">
                    {project.licenseSpdx}
                  </span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" /> Source
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── OpenPlan spotlight ───────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-b border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="index-label text-[color:var(--copper)]">OpenPlan</p>
              <h2 className="display-2 mt-5 text-white">
                An operating system for a planning department.
              </h2>
              <p className="mt-5 text-white/70">
                Not another dashboard. OpenPlan puts projects, funding, maps, reports, and evidence
                on one spine, with the map as the worksurface and provenance on every number.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/55">
                Honest about its limits: the modeling is screening-grade, not a calibrated forecast,
                and it is built to support qualified planning review, never to replace it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/openplan">
                    See what it does <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="https://github.com/nfredmond/openplan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> Read the source
                </a>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2">
              {openplanCapabilities.map((cap) => (
                <li key={cap.heading} className="bg-[#0b120f] p-6">
                  <h3 className="font-display text-xl font-semibold text-white">{cap.heading}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-white/65">{cap.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Planning services ────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="index-label">Services</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Software does not replace planning judgment.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                The tools make the work reusable and auditable. They do not decide what a corridor
                needs or how a board will read it. That part is still done by hand.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <li key={service.name} className="bg-[color:var(--surface)]">
                    <Link
                      href={service.href}
                      className="group flex h-full items-start gap-4 p-6 transition-colors hover:bg-[color:var(--surface-2)]"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                      <span>
                        <span className="flex items-center gap-1.5 font-display text-xl font-semibold text-[color:var(--ink)]">
                          {service.name}
                          <ArrowUpRight className="h-4 w-4 text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">
                          {service.desc}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
              <li className="bg-[color:var(--surface)]">
                <div className="flex h-full flex-col justify-center gap-1 p-6">
                  <span className="data text-xs text-[color:var(--muted)]">Also available</span>
                  <span className="text-sm leading-6 text-[color:var(--muted)]">
                    Funding readiness reviews, AI-use policy, and staff training.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Implementation ladder ────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Working together</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Four ways to start, in the order most teams need them.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Most agencies begin with a fit audit, because the honest first answer is sometimes
              &ldquo;don&rsquo;t build this.&rdquo; From there the work escalates only as far as it needs to.
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={supportCtaForProject(openplan).href}>
                Start with a fit audit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/open-source">How the open-source model works</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Closing / who you're talking to ──────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="surface-card overflow-hidden">
            <div className="grid md:grid-cols-[0.72fr_1.28fr]">
              <div className="relative min-h-80 border-b border-[color:var(--line)] md:border-b-0 md:border-r">
                <Image
                  src="/images/headshot.png"
                  alt="Nathaniel Ford Redmond, founder of Nat Ford Planning & Analysis"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-[center_25%]"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="index-label">Nathaniel Ford Redmond</p>
                <h2 className="display-3 mt-4 text-[color:var(--ink)]">
                  Tell me what you&rsquo;re working on.
                </h2>
                <p className="measure mt-4 text-[color:var(--muted)]">
                  I&rsquo;m a transportation planner who builds the software too. If you run a small
                  agency, a consultancy, or a public-interest team and you are trying to do more with
                  a lean crew, that is exactly who these tools are for. No sales team, no funnel. Just
                  a scoping conversation.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button asChild size="lg">
                    <Link href="/contact?intent=discovery">
                      Talk to Nat <ArrowRight className="h-4 w-4" />
                    </Link>
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

      <PlannerChatbot />
    </>
  )
}
