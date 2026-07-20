import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Database,
  Map as MapIcon,
  Globe,
  Workflow,
  Layers,
  FileCode2,
  MapPin,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { SectionEndCTA } from '@/components/features/section-end-cta'
import { ContourField } from '@/components/features/contour-field'
import {
  openSourceProjects,
  licenseLabel,
  sourceAvailabilityLabel,
  supportCtaForProject,
} from '@/data/open-source-projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GIS & Spatial Analysis',
  description:
    'PostGIS, QGIS, web maps, data pipelines, and scenario analysis for transportation and planning teams. Reproducible spatial work that shows its sources.',
}

const capabilities = [
  {
    icon: Database,
    title: 'PostGIS data model',
    body: 'One Postgres/PostGIS database that holds your corridors, parcels, crash points, and demographics with a spatial index, so a query answers in seconds instead of a manual join across five shapefiles.',
  },
  {
    icon: MapIcon,
    title: 'QGIS analysis & cartography',
    body: 'Buffers, overlays, and network-gap analysis in QGIS, plus print-quality layouts that export to the exact map a board packet needs.',
  },
  {
    icon: Globe,
    title: 'Web maps',
    body: 'Interactive maps a public reader can click. Layers for projects, comments, and equity tracts, served from the same database the analysis runs on.',
  },
  {
    icon: Workflow,
    title: 'Data pipelines',
    body: 'A repeatable pipeline that pulls Census/ACS, OSM, and state DOT sources, cleans them, and reloads on a schedule, so the numbers refresh without a rebuild by hand.',
  },
  {
    icon: Layers,
    title: 'Scenario analysis',
    body: 'Compare alternatives on the same spatial footprint: gap-closure, access, and VMT screens with before/after figures a decision-maker can read.',
  },
  {
    icon: FileCode2,
    title: 'Documented queries',
    body: 'Every query is written down and versioned, so your staff can re-run the analysis next cycle without me in the room.',
  },
]

const deliverables = [
  {
    title: 'PostGIS-backed data model with documented queries',
    detail: 'The schema and the SQL come with it, so your team can re-run and extend the analysis.',
  },
  {
    title: 'Safety, equity, and access diagnostics by corridor or area',
    detail: 'Crash density, disadvantaged-community overlap, and gap analysis, scored the same way every time.',
  },
  {
    title: 'Board-ready map exports and web map layers',
    detail: 'Print layouts for the packet and an interactive layer the public can click, from one source of truth.',
  },
  {
    title: 'Automated update workflow for recurring reporting',
    detail: 'A scheduled refresh of Census, OSM, and state DOT inputs so the next report is not a rebuild from scratch.',
  },
]

export default function GISServicePage() {
  const opengeo = openSourceProjects.find((p) => p.slug === 'opengeo')!
  const opengeoSupport = supportCtaForProject(opengeo)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Services · GIS &amp; spatial analysis</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Spatial analysis that shows its work.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                PostGIS, QGIS, web maps, and data pipelines for transportation and planning teams. I
                turn scattered shapefiles and CSVs into one queryable spatial model, then hand back
                maps a board can read and queries your staff can re-run.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=gis-mapping">
                    Request GIS intake <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={opengeo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> See OpenGeo source
                </a>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down aerial capture of a rural intersection, the kind of imagery digitized into GIS layers"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Intersection, top-down capture</span>
                  <span className="text-[color:var(--copper)]">PostGIS</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={opengeo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  {licenseLabel(opengeo)} · opengeo
                </a>
                <span className="provenance">PostGIS + MapLibre</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The spatial toolkit</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              From scattered files to one queryable model.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Most agencies already have the data. It just lives in a dozen folders, formats, and
              projections. The work is getting it into one place where a question has an answer, and
              keeping that answer honest about where it came from.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <li key={cap.title} className="bg-[color:var(--surface)] p-6">
                  <Icon
                    className="h-5 w-5 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold text-[color:var(--ink)]">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">{cap.body}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <Section spacing="lg" className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">What you get</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">Typical deliverables.</h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                A GIS-first scope starts by mapping the data sources and the decision the analysis
                has to inform. From there the work is sized to what you actually need, not a fixed
                package.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=gis-mapping">
                    Request GIS intake <ArrowRight className="h-4 w-4" />
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

            <dl className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {deliverables.map((item) => (
                <div key={item.title} className="grid gap-3 py-7 sm:grid-cols-[1.5rem_1fr] sm:gap-6">
                  <div
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 translate-y-2.5 rounded-full bg-[color:var(--copper)] sm:block"
                  />
                  <div>
                    <dt className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {item.title}
                    </dt>
                    <dd className="measure mt-2.5 text-[color:var(--muted)]">{item.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── OpenGeo — the tool behind the work ───────────────── */}
      <section className="on-dark relative overflow-hidden border-b border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="index-label text-[color:var(--copper)]">Open source</p>
              <h2 className="display-2 mt-5 text-white">The geospatial platform is public.</h2>
              <p className="mt-5 text-white/70">{opengeo.summary}</p>
              <p className="mt-4 text-sm leading-6 text-white/55">
                It is an active alpha, built to support qualified geospatial review, not replace it.
                You can read the code before we ever talk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={opengeoSupport.href}>
                    {opengeoSupport.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={opengeo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> Read the source
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="provenance">{licenseLabel(opengeo)}</span>
                <span className="provenance">{sourceAvailabilityLabel(opengeo)}</span>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2">
              {opengeo.primitives.map((primitive) => (
                <li key={primitive} className="flex items-center gap-3 bg-[#0b120f] p-6">
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[color:var(--copper)]"
                    aria-hidden="true"
                  />
                  <span className="font-display text-lg font-semibold text-white">{primitive}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <SectionEndCTA
        heading="Explore related planning work"
        primary={{
          href: '/services/planning',
          label: (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Urban &amp; Transportation Planning
            </>
          ),
        }}
      />
    </>
  )
}
