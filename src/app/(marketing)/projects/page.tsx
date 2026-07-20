import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import JsonLd from '@/components/features/json-ld'
import { ContourField } from '@/components/features/contour-field'
import projectsData from '@/data/projects.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planning Experience',
  description:
    'Six rural transportation-planning engagements delivered across Northern California while on staff at Green DOT Transportation Solutions.',
}

type Engagement = {
  title: string
  year: string
  focus: string
  services: string[]
  href?: string
}

const engagements: Engagement[] = [
  {
    title: 'Sierra County RTP',
    year: '2024',
    focus:
      'Performance targets and a fiscally constrained investment roadmap for a high-elevation rural county.',
    services: ['Transportation Planning', 'GIS Analysis', 'Funding Strategy'],
    href: '/projects/sierra-rtp',
  },
  {
    title: 'Del Norte County ATP',
    year: '2024',
    focus:
      'Active-transportation network gaps turned into phaseable, grant-ready applications, with a Safe Routes focus.',
    services: ['Active Transportation', 'Safe Routes', 'Grant Writing'],
    href: '/projects/del-norte-atp',
  },
  {
    title: 'Tehama County VMT & CIP',
    year: '2025',
    focus:
      'VMT-reduction strategy connected to a realistic, prioritized capital-improvement program.',
    services: ['Carbon Reduction', 'VMT Analysis', 'CIP Development'],
    href: '/projects/tehama-vmt',
  },
  {
    title: 'Plumas Transit FTA 5339',
    year: '2024',
    focus:
      'Grant narrative for an FTA 5339 transit facility, linking site feasibility, fleet transition, and public benefit.',
    services: ['Grant Writing', 'Transit Planning', 'Site Concepting'],
  },
  {
    title: 'Placer County MIAS',
    year: '2024',
    focus:
      'Countywide multimodal screening with planning-level cost bands and project-packaging guidance.',
    services: ['Complete Streets', 'GIS Analysis', 'Prioritization'],
  },
  {
    title: 'El Dorado Next Gen Mobility',
    year: '2024',
    focus:
      'Phased mobility-program options with a KPI framework and an implementation structure.',
    services: ['Mobility Strategy', 'Transit & TDM', 'Data Storytelling'],
  },
]

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsData} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Planning experience · prior employment</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Rural planning work, on the record.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                Six transportation-planning engagements I delivered across Northern California. All of
                them were done while I was on staff at Green DOT Transportation Solutions, so this is
                prior-employment experience, not Nat Ford Planning client work. I list them because
                they are the clearest record of the planning judgment the software is built to carry.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/services">
                    See the current services <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/products">Browse the software</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/workshop-maps.jpg"
                  alt="Printed corridor and network maps spread across a planning-workshop table"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Corridor &amp; network maps</span>
                  <span className="text-[color:var(--copper)]">2024&ndash;2025</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Prior employer · Green DOT Transportation Solutions</span>
                <span className="provenance">6 engagements · Northern California</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── The register ─────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The field record</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Six engagements, delivered on staff.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Each one shipped as a real deliverable for a rural Northern California agency. Three have
              detailed write-ups. The others are here as a record of the work.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {engagements.map((e, i) => (
              <li
                key={e.title}
                className="grid gap-3 py-7 sm:grid-cols-[minmax(0,6rem)_1fr] sm:gap-8"
              >
                <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1 sm:pt-1.5">
                  <span className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="data text-sm text-[color:var(--muted)]">{e.year}</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                    {e.title}
                  </h3>
                  <p className="measure mt-2 text-[color:var(--muted)]">{e.focus}</p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Disciplines">
                    {e.services.map((service) => (
                      <li
                        key={service}
                        className="label rounded-full border border-[color:var(--line)] px-2.5 py-1"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  {e.href && (
                    <div className="mt-4">
                      <Link
                        href={e.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                      >
                        Read the write-up
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Closing / what I do now ──────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-t border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="index-label text-[color:var(--copper)]">What I do now</p>
            <h2 className="display-2 mt-5 text-white">
              The same judgment, now with the software to carry it.
            </h2>
            <p className="mt-5 text-white/70">
              Nat Ford Planning is where that work continues: transportation planning, GIS, grants,
              and open-source tools that make each one reusable. If your agency runs lean, that is who
              this is for.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="/services">
                  View services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <a href="/products" className="btn btn-outline btn-lg">
                View the software
              </a>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="font-mono text-sm text-[color:var(--copper)] hover:underline"
              >
                nathaniel@natfordplanning.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
