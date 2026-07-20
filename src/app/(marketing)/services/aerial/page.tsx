import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Layers,
  Mountain,
  Camera,
  Database,
  Check,
  MapPin,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import { SectionEndCTA } from '@/components/features/section-end-cta'

export const metadata: Metadata = {
  title: 'Aerial Mapping & Drone Capture',
  description:
    'FAA Part 107 drone capture, orthomosaics, and terrain models for planning. Planning-grade base maps and GIS-ready handoff, honest about where survey-grade work begins.',
}

const deliverables = [
  {
    icon: Layers,
    name: 'Orthomosaics',
    body: 'Overlapping nadir photos stitched and georeferenced into one seamless, measurable base image of the site or corridor.',
    format: 'GeoTIFF · GeoJSON footprint',
  },
  {
    icon: Mountain,
    name: 'Terrain models',
    body: 'Digital surface and terrain models (DSM/DTM) you can read for grade, drainage, and rough cut-and-fill along a corridor.',
    format: 'DSM / DTM · GeoTIFF',
  },
  {
    icon: Camera,
    name: 'Visual evidence packs',
    body: 'Annotated top-downs and obliques for existing-conditions exhibits, board packets, public meetings, and grant applications.',
    format: 'PNG · PDF · JPG',
  },
  {
    icon: Database,
    name: 'GIS-ready handoff',
    body: 'Everything georeferenced and packaged to drop straight into QGIS or PostGIS, so the capture feeds the same map your plan runs on.',
    format: 'GeoTIFF · LAS · SHP',
  },
]

const goodFor = [
  'Corridor and site context at a glance',
  'Existing-conditions exhibits for boards and the public',
  'Grade, drainage, and cut-and-fill screening',
  'Progress documentation across project phases',
  'A georeferenced base for GIS scenario work',
]

const bringASurveyor = [
  'You need legal boundary or right-of-way lines',
  'Construction or design staking depends on it',
  'Elevations must meet a survey accuracy standard',
  'The record has to stand as a survey of record',
]

const steps = [
  {
    title: 'Scope the airspace and the outputs',
    body: 'Before anything flies we settle the airspace class and any LAANC authorization, the timing for light and season, and exactly which products your plan will use.',
  },
  {
    title: 'Fly it under Part 107',
    body: 'I fly the mission myself as an FAA-certificated remote pilot, with overlap and altitude set for the outputs you need and a log of the conditions on the day.',
  },
  {
    title: 'Process and hand off',
    body: 'Imagery becomes orthomosaics, terrain models, and annotated stills, delivered as GIS-ready files with a short note on capture conditions and expected accuracy.',
  },
]

export default function AerialServicePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Aerial capture · FAA Part 107</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Fly the corridor, get a base map you can plan on.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                I fly sites under FAA Part 107, process the imagery into orthomosaics and terrain
                models, and hand you layers that drop straight into your GIS. Planning-grade,
                documented, and honest about where a licensed surveyor still has to take over.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=aerial-mapping">
                    Request an aerial scope <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#deliverables">What you get</Link>
                </Button>
                <a
                  href="mailto:nathaniel@natfordplanning.com"
                  className="inline-flex items-center px-2 py-2 font-mono text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--pine)] dark:hover:text-[color:var(--pine-soft)]"
                >
                  nathaniel@natfordplanning.com
                </a>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down drone capture of a rural intersection, the kind of nadir frame processed into a georeferenced orthomosaic"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Nadir capture</span>
                  <span className="text-[color:var(--copper)]">≤400 ft AGL</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">FAA Part 107</span>
                <span className="provenance">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Northern California
                </span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <Section spacing="lg" id="deliverables">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">What comes off the drone</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Four outputs, all georeferenced.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              A capture is only useful if the plan can use it. Everything ships in formats your GIS
              already reads, tied to real coordinates, with the capture conditions written down.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
            {deliverables.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name} className="bg-[color:var(--surface)] p-6 md:p-7">
                  <Icon
                    className="h-5 w-5 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold text-[color:var(--ink)]">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-[color:var(--muted)]">{item.body}</p>
                  <p className="data mt-4 border-t border-[color:var(--line)] pt-3 text-xs text-[color:var(--muted)]">
                    {item.format}
                  </p>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ── Honest about the grade ───────────────────────────── */}
      <Section
        spacing="lg"
        className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50"
      >
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Where it fits</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Planning-grade, not survey-grade.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Drone imagery is excellent for context, screening, and communication. It is not a
              boundary or engineering survey. My outputs are accurate enough to plan and prioritize
              with, not certified to the tolerances a licensed land surveyor signs. When a project
              crosses into legal lines or design tolerances, I will say so and point you to a
              surveyor.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <figure>
              <div className="plate aspect-[16/10] w-full">
                <Image
                  src="/images/site/drone-corridor-valley-2026-03.jpg"
                  alt="Aerial view of a rural highway corridor winding through a Northern California valley, showing terrain and grade"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/70 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 02 · Corridor context</span>
                  <span className="text-[color:var(--copper)]">Screening-grade</span>
                </figcaption>
              </div>
            </figure>

            <div className="surface-card divide-y divide-[color:var(--line)]">
              <div className="p-6 md:p-7">
                <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                  Good for
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {goodFor.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm leading-6 text-[color:var(--muted)]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                        aria-hidden="true"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                  Bring a licensed surveyor when
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {bringASurveyor.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm leading-6 text-[color:var(--muted)]">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--copper)]"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── How a capture goes ───────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-b border-[color:var(--line)]">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">How a capture goes</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Scope the airspace, fly it, hand off files.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Same person plans the flight, holds the certificate, and processes the data. No
                subcontracted crew, no handoff where the context gets lost.
              </p>
              <span className="provenance mt-6 inline-flex">
                FAA Part 107 · Remote Pilot Certificate
              </span>
            </div>

            <ol className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {steps.map((step, i) => (
                <li key={step.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="data text-lg text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="measure mt-2.5 text-[color:var(--muted)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <SectionEndCTA
        heading="Have a site that needs mapping?"
        subhead="Tell me the location, the deadline, and what the imagery is for. I'll scope airspace, timing, and outputs, and tell you straight if a licensed surveyor should handle it instead."
        primary={{
          href: '/contact?intent=discovery&topic=aerial-mapping',
          label: 'Request an aerial scope',
        }}
        secondary={{ href: '/services/gis', label: 'GIS & spatial analysis' }}
      />
    </>
  )
}
