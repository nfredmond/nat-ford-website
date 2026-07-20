import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  Mail,
  MapPin,
  Layers,
  FileText,
  Plane,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nathaniel Ford Redmond is a master’s-trained transportation and urban planner in Northern California, from rural counties to San Francisco, who also builds the open-source planning software. FAA Part 107 remote pilot.',
}

const facts = [
  { label: 'Education', value: 'Master of Urban Planning, San José State' },
  { label: 'Base', value: 'Sierra foothills, near Grass Valley, CA' },
  { label: 'Reach', value: 'Remote-first across the U.S.; field work when it helps' },
  { label: 'Certification', value: 'FAA Part 107 remote pilot' },
]

const capabilities = [
  {
    icon: MapPin,
    title: 'Regional & transportation planning',
    body: 'RTPs, ATPs, complete-streets support, VMT and carbon analysis, and the board materials that carry a recommendation.',
  },
  {
    icon: Layers,
    title: 'GIS & spatial analysis',
    body: 'PostGIS data systems, interactive planning maps, safety and access diagnostics, and automated map and report pipelines.',
  },
  {
    icon: FileText,
    title: 'Grants & funding',
    body: 'Program fit and positioning, narrative development, benefit-cost framing, and grant packages carried through submission.',
  },
  {
    icon: Plane,
    title: 'Aerial mapping',
    body: 'FAA Part 107 drone capture, orthomosaics, and terrain models for corridor and site work.',
  },
]

const priorEmployment = [
  {
    title: 'Senior Transportation Planner',
    employer: 'Green DOT Transportation Solutions',
    years: '2021–2025',
    highlights: [
      'Led and supported RTP and ATP work across more than a dozen Northern California counties.',
      'Built VMT and carbon-reduction analysis into implementable CIP pathways.',
      'Contributed to grant applications including ATP, RAISE, TIRCP, and PROTECT.',
    ],
  },
  {
    title: 'Transportation Coordinator',
    employer: 'gRide, Genentech commuter program',
    years: '2018–2021',
    highlights: [
      'Coordinated multimodal commuter services, including an early electric-bus deployment.',
      'Ran cross-system operations spanning transit, shuttle, ferry, and carpool.',
      'Supported coalition coordination and commuter performance reporting.',
    ],
  },
  {
    title: 'Planning Intern',
    employer: 'San Francisco County Transportation Authority',
    years: '2017–2018',
    highlights: [
      'Supported ConnectSF long-range planning and Vision Zero safety analysis for San Francisco.',
      'Assisted with survey work, community workshops, and policy research.',
      'Produced planning materials for technical and public audiences.',
    ],
  },
]

const counties = [
  'Sierra',
  'Plumas',
  'Tehama',
  'Del Norte',
  'Trinity',
  'Alpine',
  'Calaveras',
  'Colusa',
  'Siskiyou',
  'Shasta',
  'Butte',
  'Humboldt',
  'El Dorado',
  'Placer',
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Founder profile</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Nathaniel Ford Redmond
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                I&rsquo;m a master&rsquo;s-trained transportation and urban planner based in the Sierra
                foothills of Northern California. My work spans the state&rsquo;s planning range:
                regional and active transportation plans across rural counties, and the denser urban
                questions I first took on as a planning intern at the San Francisco County
                Transportation Authority.
              </p>
              <p className="reveal reveal-3 measure-wide mt-4 text-[color:var(--muted)]">
                I also build the software that work runs on, and I keep it open. The goal is plain:
                put expert-level planning tools within reach of the small cities, counties, and
                Tribal governments that can rarely afford them. The same person writes the code and
                the memo, so the methods stay legible, the assumptions are stated, and the
                recommendation is something you can fund and build.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Talk to Nat <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="https://www.linkedin.com/in/nfredmond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                </a>
              </div>

              <dl className="reveal reveal-5 mt-9 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[color:var(--line)] pt-7 lg:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="label">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[color:var(--muted)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Figure plate — the headshot as a report plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-sm">
                <Image
                  src="/images/headshot.png"
                  alt="Portrait of Nathaniel Ford Redmond, founder of Nat Ford Planning & Analysis"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover object-[center_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/72 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Nathaniel Ford Redmond</span>
                  <span className="text-[color:var(--copper)]">Grass Valley, CA</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">FAA Part 107</span>
                <a
                  href="https://www.linkedin.com/in/nfredmond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  linkedin.com/in/nfredmond
                </a>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── What I do ────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="index-label">What I do</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                A planner who ships the software too.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                The planning side is the core of the practice. The software exists to make that work
                reusable and auditable, not to replace the judgment a corridor or a board still
                needs. Both come from the same desk.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                See the services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {capabilities.map((cap) => {
                const Icon = cap.icon
                return (
                  <li key={cap.title} className="flex h-full items-start gap-4 bg-[color:var(--surface)] p-6">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                        {cap.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-[color:var(--muted)]">{cap.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Where the experience comes from ──────────────────── */}
      <Section spacing="lg" className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Prior roles</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Where the experience comes from.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Nat Ford Planning is newer than the record below. These are the roles that built the
              method, from rural county networks in Northern California to urban corridors in San
              Francisco.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {priorEmployment.map((role) => (
              <li
                key={role.employer}
                className="grid gap-4 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10"
              >
                <div>
                  <p className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {role.years}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[color:var(--ink)]">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]">
                    {role.employer}
                  </p>
                </div>
                <ul className="space-y-2.5 self-center">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--copper)]"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Counties (experience base) ───────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="index-label">Regional experience</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Counties the work has touched.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              These Northern California counties are where the regional planning experience was
              earned, delivered while I was at Green DOT. Read it as the ground the practice stands
              on, not a Nat Ford client list.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {counties.map((county) => (
              <li
                key={county}
                className="data inline-flex items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-1.5 text-sm text-[color:var(--muted)]"
              >
                {county} County
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Closing / contact ────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-t border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="index-label text-[color:var(--copper)]">Get in touch</p>
            <h2 className="display-2 mt-5 text-white">Tell me what you&rsquo;re working on.</h2>
            <p className="mt-5 text-white/70">
              If you run a small city, a county, a Tribal government, a consultancy, or a
              public-interest team and you&rsquo;re trying to do more with a lean crew, that is exactly
              who this is for. No sales team, no funnel. Start with a scoping conversation and
              we&rsquo;ll map the fastest credible path from analysis to implementation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="/contact?intent=discovery">
                  Talk to Nat <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <a
                href="https://www.linkedin.com/in/nfredmond"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-white/80 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> nathaniel@natfordplanning.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
