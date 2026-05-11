import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code2, Database, FileText, MapPin, Plane, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { SectionEndCTA } from '@/components/features/section-end-cta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Planning, GIS, funding strategy, open-source software deployment, and custom software development for agencies, consultancies, and companies with real workflow problems.'
}

const services = [
  {
    name: 'Urban & Transportation Planning',
    description:
      'Regional plans, active transportation plans, corridor strategy, and board-ready packages grounded in what staff can actually deliver.',
    icon: MapPin,
    href: '/services/planning',
    outcomes: [
      'Clear project prioritization tied to constraints',
      'Defensible analysis narratives for public review',
      'Implementation-ready scope and phasing guidance',
    ],
  },
  {
    name: 'GIS & Spatial Analysis',
    description:
      'Map products, spatial data cleanup, and practical analysis that turn scattered information into clear recommendations.',
    icon: Database,
    href: '/services/gis',
    outcomes: [
      'PostGIS-backed reproducible workflows',
      'Hotspot and accessibility mapping that withstands scrutiny',
      'Production-friendly map exports for reports and presentations',
    ],
  },
  {
    name: 'Aerial Mapping & Photogrammetry',
    description:
      'FAA-certified drone capture and measurable map outputs for corridors, sites, assets, and public-facing evidence.',
    icon: Plane,
    href: '/services/aerial',
    outcomes: [
      'Orthomosaics and terrain products for planning context',
      'Faster field-to-analysis turnaround',
      'Visual evidence packages for stakeholder alignment',
    ],
  },
  {
    name: 'Funding & Grant Services',
    description:
      'Grant fit checks, benefit framing, and package assembly for teams that need a stronger, cleaner submission.',
    icon: FileText,
    href: '/services/grants',
    outcomes: [
      'Program alignment and timing clarity',
      'Stronger benefit framing with cleaner logic chains',
      'Submission-ready package discipline',
    ],
  },
  {
    name: 'Open-Source & Custom Software',
    description:
      'Open-source project deployment, custom internal tools, AI workflows, dashboards, portals, automations, and supported company-specific forks.',
    icon: Code2,
    href: '/open-source',
    outcomes: [
      'Free code with paid implementation support',
      'Custom forks, hosting, onboarding, and support',
      'Software for planning teams and non-planning companies alike',
    ],
  },
  {
    name: 'AI-Enabled Documentation',
    description:
      'Human-reviewed drafting, tables, figures, and QA support that shortens production without handing judgment to a black box.',
    icon: Sparkles,
    href: '/services/ai',
    outcomes: [
      'Shorter production cycles without quality loss',
      'Methods and assumptions clarity in final documents',
      'Reduced formatting and revision churn',
    ],
  },
]

const capabilityMatrix = [
  { label: 'Plans', value: 'RTP · ATP · corridor packages' },
  { label: 'Maps', value: 'GIS · QA · public exhibits' },
  { label: 'Field evidence', value: 'FAA Part 107 drone capture' },
  { label: 'Funding', value: 'Fit · scoring · grant packages' },
  { label: 'Software', value: 'Open source · AI · internal tools' },
]

export default function ServicesPage() {
  return (
    <>
      <Section spacing="md" className="hero-mesh text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)] lg:items-center">
            <div className="max-w-3xl">
              <span className="nf-kicker"><span>Service portfolio</span><span>Decision support</span></span>
              <h1 className="section-title mt-4 text-[2.35rem] leading-[0.97] text-white sm:text-5xl md:text-6xl">
                Services that help agencies decide, fund, map, and{' '}
                <span className="text-[color:var(--copper)]">deliver the work</span>.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
                Nat Ford combines planning, GIS, drone mapping, grant support, and custom software so public teams and mission-driven companies can move from messy inputs to usable deliverables without starting over three times.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/contact?intent=discovery">
                    Schedule a 30-minute discovery call <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full border-white/35 text-white hover:border-white hover:text-white sm:w-auto">
                  <Link href="/contact?intent=discovery&topic=custom-software">Tell us what you need built</Link>
                </Button>
              </div>
              <p className="mt-3 text-sm text-white/72">
                You will leave the first call with a plain-English next step, rough level of effort, and the main risks to watch.
              </p>
            </div>

            <div className="rounded-2xl border border-white/18 bg-white/[0.06] p-5 backdrop-blur-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-white/78">
                What a buyer can expect
              </p>
              <dl className="mt-4 space-y-2.5">
                {capabilityMatrix.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-white/78">{item.label}</dt>
                    <dd className="text-right text-sm text-white/88">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" className="border-y border-[color:var(--line)] bg-[color:var(--background)]/90">
        <Container>
          <div className="grid gap-3 text-sm font-semibold text-[color:var(--foreground)]/78 md:grid-cols-4">
            <div className="border-t border-[color:var(--line)] pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0">Northern California planning practice</div>
            <div className="border-t border-[color:var(--line)] pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0">FAA Part 107 aerial capture</div>
            <div className="border-t border-[color:var(--line)] pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0">Public-sector board-ready deliverables</div>
            <div className="border-t border-[color:var(--line)] pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0">Open-source software with paid support</div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="border-y border-[color:var(--line)] bg-[color:var(--background)]/85">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <figure className="relative h-60 overflow-hidden rounded-2xl border border-[color:var(--line)]">
              <Image
                src="/images/site/drone-intersection-topdown-2026-03.jpg"
                alt="Top-down drone capture of a civic intersection used for lane and safety analysis"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2f]/70 via-[#0f1f2f]/20 to-transparent" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs font-medium uppercase tracking-[0.12em] text-white/90">
                Top-down capture · lane & safety analysis
              </figcaption>
            </figure>
            <figure className="relative h-60 overflow-hidden rounded-2xl border border-[color:var(--line)]">
              <Image
                src="/images/site/drone-town-overview-2026-03.jpg"
                alt="Oblique drone overview of a small-town street network and surrounding valley context"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2f]/70 via-[#0f1f2f]/20 to-transparent" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs font-medium uppercase tracking-[0.12em] text-white/90">
                Oblique overview · corridor & context
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div className="mb-10 max-w-3xl">
            <span className="nf-kicker"><span>Six integrated lanes</span><span>One delivery thread</span></span>
            <h2 className="section-title mt-4 text-4xl text-[color:var(--ink)] md:text-5xl">
              Each service stands alone. Together, they compress the delivery cycle.
            </h2>
          </div>

          <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {services.map((service, index) => {
              const Icon = service.icon
              const num = String(index + 1).padStart(2, '0')
              return (
                <article
                  key={service.name}
                  className="group grid grid-cols-1 gap-0 bg-[color:var(--background)] transition-colors hover:bg-[color:var(--fog)]/42 lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(280px,0.72fr)_auto]"
                >
                  <div className="flex items-start justify-between border-b border-[color:var(--line)] px-4 py-5 lg:block lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
                    <span className="font-display text-4xl font-semibold leading-none text-[color:var(--pine)]">{num}</span>
                    <Icon className="h-5 w-5 text-[color:var(--copper)] lg:mt-8" aria-hidden="true" />
                  </div>

                  <div className="border-b border-[color:var(--line)] px-5 py-5 lg:border-b-0 lg:border-r lg:px-7 lg:py-7">
                    <h3 className="text-2xl font-semibold text-[color:var(--ink)] md:text-[1.7rem]">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[1rem] text-[color:var(--foreground)]/78">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-b border-[color:var(--line)] px-5 py-5 lg:border-b-0 lg:border-r lg:px-7 lg:py-7">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--foreground)]/58">
                      Typical outcomes
                    </p>
                    <ul className="mt-3 space-y-2">
                      {service.outcomes.map((item) => (
                        <li key={item} className="grid grid-cols-[1rem_1fr] gap-2 text-sm text-[color:var(--foreground)]/80">
                          <span className="mt-2 h-px bg-[color:var(--copper)]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center px-5 py-5 lg:px-7 lg:py-7">
                    <Button asChild variant="outline" className="w-full whitespace-nowrap rounded-none border-[color:var(--pine)]/35 bg-transparent lg:w-auto">
                      <Link href={service.href}>
                        View details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      <SectionEndCTA
        heading="Not sure where to start?"
        subhead="Start with a 30-minute intake and we’ll recommend a scope that matches your timeline, budget, and decision risk."
        primary={{ href: '/contact?intent=discovery', label: 'Schedule discovery' }}
        secondary={{ href: '/contact?intent=discovery&topic=custom-software', label: 'Scope a project' }}
      />
    </>
  )
}
