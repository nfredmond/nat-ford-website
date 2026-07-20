import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Code2,
  Database,
  FileText,
  MapPin,
  Plane,
  Sparkles,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { SectionEndCTA } from '@/components/features/section-end-cta'
import { ContourField } from '@/components/features/contour-field'
import JsonLd from '@/components/features/json-ld'
import servicesData from '@/data/services.json'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Transportation planning, GIS, aerial mapping, grant strategy, and custom open-source software for agencies and mission-driven companies in Northern California and beyond.',
}

const services = [
  {
    name: 'Transportation planning',
    icon: MapPin,
    href: '/services/planning',
    description:
      'RTPs, active transportation plans, corridor strategy, and VMT screening, scoped to what your staff can actually carry.',
    deliverables: [
      'RTP and ATP documents',
      'Corridor and safety analysis',
      'Board-ready packages and exhibits',
    ],
  },
  {
    name: 'GIS & spatial analysis',
    icon: Database,
    href: '/services/gis',
    description:
      'PostGIS pipelines, web maps, and analysis that turn scattered layers into something a board can read and trust.',
    deliverables: [
      'Reproducible PostGIS workflows',
      'Accessibility and hotspot mapping',
      'Print and web map exports',
    ],
  },
  {
    name: 'Aerial mapping',
    icon: Plane,
    href: '/services/aerial',
    description:
      'FAA Part 107 drone capture with measurable outputs: orthomosaics, terrain models, and before-and-after evidence.',
    deliverables: [
      'Orthomosaics and terrain models',
      'Corridor and site capture',
      'Visual evidence for stakeholders',
    ],
  },
  {
    name: 'Grants & funding',
    icon: FileText,
    href: '/services/grants',
    description:
      'ATP, HSIP, CRP, and FTA strategy, narrative drafting, and readiness reviews for teams that need a cleaner submission.',
    deliverables: [
      'Program fit and timing',
      'Benefit framing and narratives',
      'Submission-ready packages',
    ],
  },
  {
    name: 'Open-source & custom software',
    icon: Code2,
    href: '/open-source',
    description:
      'Free, open code with paid deployment: custom forks, hosting, onboarding, and support, for planning teams and companies alike.',
    deliverables: [
      'Managed deployments and forks',
      'Dashboards, portals, and automations',
      'AI workflows for real processes',
    ],
  },
  {
    name: 'AI-enabled documentation',
    icon: Sparkles,
    href: '/services/ai',
    description:
      'Human-reviewed drafting, tables, figures, and QA that shortens production without handing judgment to a black box.',
    deliverables: [
      'Drafted sections and tables',
      'Methods and assumptions clarity',
      'Fewer formatting and revision cycles',
    ],
  },
]

const firstCall = [
  {
    heading: 'A recommended next step',
    body: 'In plain English, what to do first, and whether the thing is even worth building.',
  },
  {
    heading: 'A rough level of effort',
    body: 'An order-of-magnitude range for time and cost, not a number tuned to win the work.',
  },
  {
    heading: 'The main risks',
    body: 'The two or three things most likely to bite the schedule or the budget.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesData} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">
                Services · planning · GIS · aerial · funding · software
              </p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Six services, run by the person who builds the software.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                Transportation planning, GIS, aerial capture, grant strategy, and custom software.
                Nathaniel Ford Redmond does the analysis and writes the code, so the judgment and the
                tools stay in one head, and every deliverable can hold up in public.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Book a discovery call <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact?intent=discovery&topic=custom-software">
                    Scope custom software
                  </Link>
                </Button>
                <Link
                  href="/open-source"
                  className="inline-flex items-center gap-1.5 px-2 py-2 text-[0.95rem] font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--pine)] dark:hover:text-[color:var(--pine-soft)]"
                >
                  or how the open-source model works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-mainstreet-parking-2026-03.jpg"
                  alt="Aerial view of a small-town main street showing the parking and curb layout used in a corridor study"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Main-street corridor, aerial</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Northern California</span>
                <span className="provenance">Field capture → board packet</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── The six lanes ────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Six lanes</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Six services. Each stands on its own.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Most projects pull from two or three of these. You do not have to buy the whole stack,
              and I will tell you when a lane is not worth the spend.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {services.map((service, index) => {
              const Icon = service.icon
              const num = String(index + 1).padStart(2, '0')
              return (
                <li
                  key={service.name}
                  className="group relative grid gap-5 py-8 md:grid-cols-[3.25rem_minmax(0,1fr)_auto] md:items-start md:gap-8"
                >
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                    <span className="data text-2xl font-medium text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                      {num}
                    </span>
                    <Icon
                      className="h-5 w-5 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      <Link
                        href={service.href}
                        className="after:absolute after:inset-0 group-hover:underline"
                      >
                        {service.name}
                      </Link>
                    </h3>
                    <p className="measure mt-2.5 text-[color:var(--muted)]">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-6 text-[color:var(--foreground)]/80"
                        >
                          <span
                            className="mt-[0.6rem] h-px w-3 shrink-0 bg-[color:var(--copper)]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:self-center md:pl-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[color:var(--pine)] group-hover:underline dark:text-[color:var(--pine-soft)]"
                    >
                      View details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ── Aerial evidence accent ───────────────────────────── */}
      <Section
        spacing="lg"
        className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50"
      >
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Field to figure</p>
            <h2 className="display-3 mt-5 text-[color:var(--ink)]">
              Aerial capture, turned into something measurable.
            </h2>
            <p className="measure mt-4 text-[color:var(--muted)]">
              FAA Part 107 flights produce orthomosaics and terrain models the rest of the work can
              measure against, not just overhead photos for a slide.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <figure className="plate aspect-[16/10]">
              <Image
                src="/images/site/drone-intersection-topdown-2026-03.jpg"
                alt="Top-down drone capture of a civic intersection used for lane geometry and safety analysis"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
              <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                <span>Top-down · lane &amp; safety analysis</span>
                <span className="text-[color:var(--copper)]">Orthomosaic</span>
              </figcaption>
            </figure>
            <figure className="plate aspect-[16/10]">
              <Image
                src="/images/site/drone-town-overview-2026-03.jpg"
                alt="Oblique drone overview of a small-town street network and its surrounding valley context"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
              <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                <span>Oblique · corridor &amp; context</span>
                <span className="text-[color:var(--copper)]">Terrain model</span>
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* ── The discovery call ───────────────────────────────── */}
      <Section spacing="lg" className="worksurface">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The discovery call</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Thirty minutes, and you leave with a plan.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              No sales team, no funnel. We talk through the problem, and you get concrete answers you
              can take back to your team.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {firstCall.map((item, i) => (
              <li key={item.heading} className="surface-card flex flex-col p-6">
                <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--ink)]">
                  {item.heading}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <SectionEndCTA
        heading="Not sure where to start?"
        subhead="Start with a 30-minute call. You will leave with a recommended scope for your timeline, budget, and the risks that matter."
        primary={{ href: '/contact?intent=discovery', label: 'Schedule discovery' }}
        secondary={{ href: '/contact?intent=discovery&topic=custom-software', label: 'Scope a project' }}
      />
    </>
  )
}
