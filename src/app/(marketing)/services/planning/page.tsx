import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { SectionEndCTA } from '@/components/features/section-end-cta'
import { ContourField } from '@/components/features/contour-field'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Urban & Transportation Planning Services',
  description:
    'RTP/ATP planning, VMT analysis, and carbon-reduction strategy for U.S. small towns, tribes, counties, RTPAs, transportation commissions, and state agencies.',
}

const benefits = [
  {
    title: 'Board-ready recommendations',
    body: 'Complex mobility data becomes recommendations a councilmember or commissioner can read, weigh, and vote on.',
  },
  {
    title: 'Grant-ready project lists',
    body: 'Every plan ships a prioritized, costed project list aligned with ATP, HSIP, SB-1, and IIJA funding cycles.',
  },
  {
    title: 'Analysis you can reproduce',
    body: 'Performance targets, VMT screens, and safety work run on documented GIS and SQL, so results are checkable and repeatable.',
  },
  {
    title: "Updates that don't start over",
    body: 'Figures and tables are generated from the data, so annual updates and revisions are cheap instead of a rebuild.',
  },
]

const process = [
  {
    name: 'Discovery & data assembly',
    body: 'Gather crash data (state and local sources, including SWITRS/TIMS where applicable), traffic counts (HPMS and state DOT sources), Census and ACS demographics, existing plans, and local priorities.',
    note: 'The analysis reflects real conditions and community goals, not assumptions.',
  },
  {
    name: 'Analysis & screening',
    body: 'Run network gap analysis, safety hotspot identification, VMT modeling, and equity screens in PostGIS with documented methods.',
    note: 'High-value projects surface with defensible, reproducible scoring.',
  },
  {
    name: 'Scenario development',
    body: 'Model alternatives with cross-sections, before-and-after visuals, cost bands, and phasing tied to funding windows.',
    note: 'Boards can see the trade-offs and pick a preferred direction.',
  },
  {
    name: 'Plan assembly & review',
    body: 'Draft the plan with narrative, maps, tables, and appendices, then coordinate review with state and regional partners, stakeholders, and public comment.',
    note: 'Documentation stays transparent and auditable, ready for adoption.',
  },
  {
    name: 'Implementation support',
    body: 'After adoption, help with grant applications, project scoping, and annual update guidance.',
    note: "Plans don't sit on a shelf. They turn into funded projects.",
  },
]

const deliverables = [
  'Adopted Regional Transportation Plan (RTP) or Active Transportation Plan (ATP)',
  'Interactive web map with project locations and filters',
  'Fiscally constrained project list with cost estimates and funding sources',
  'Performance target tables (safety, pavement, accessibility)',
  'VMT or carbon reduction analysis with implementation strategies',
  'Before/after concept visualizations and complete streets cross-sections',
  'Public engagement summary and board presentation materials',
  'Grant application support package (narratives, exhibits, benefit-cost framing)',
]

const relatedProjects = [
  {
    title: 'Sierra County RTP',
    description: 'Data-driven targets and a funding roadmap',
    href: '/projects/sierra-rtp',
  },
  {
    title: 'Del Norte County ATP',
    description: 'Coastal network gaps to grant-ready projects',
    href: '/projects/del-norte-atp',
  },
  {
    title: 'Tehama County VMT & CIP',
    description: 'A carbon-reduction implementation program',
    href: '/projects/tehama-vmt',
  },
]

export default function PlanningServicePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Urban &amp; transportation planning</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Turn mobility challenges into fundable, buildable plans.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                From Regional Transportation Plans to Active Transportation Plans, I pair
                reproducible analysis with clear writing, so the result is a plan your board will
                adopt and a funder will score. Every figure traces back to its data.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=planning-support">
                    Request information package <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">View planning projects</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/mainstreet-aerial.jpg"
                  alt="Aerial view of a small-town main street and its surrounding street network"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Main street, aerial context</span>
                  <span className="text-[color:var(--copper)]">RTP / ATP</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">Northern California base</span>
                <span className="provenance">Delivered nationwide</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Why it holds up (benefits) ───────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">Why it holds up</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Plans a board can act on and a funder can score.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                The same analysis that satisfies a reviewer has to read clearly to a councilmember at
                7pm on a Tuesday. Both audiences get served, from one reproducible source.
              </p>
            </div>

            <ul className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="grid gap-3 py-7 sm:grid-cols-[1.5rem_1fr] sm:gap-6">
                  <div
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 translate-y-2.5 rounded-full bg-[color:var(--copper)] sm:block"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {benefit.title}
                    </h3>
                    <p className="measure mt-2.5 text-[color:var(--muted)]">{benefit.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── The process ──────────────────────────────────────── */}
      <Section spacing="lg" className="worksurface border-y border-[color:var(--line)]">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">The process</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              From data to an adopted plan, in five steps.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Every project moves along the same spine. The depth at each step scales to the plan,
              but the sequence and the paper trail stay the same.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {process.map((item, i) => (
              <li
                key={item.name}
                className="grid gap-4 py-7 md:grid-cols-[auto_1fr] md:gap-8"
              >
                <span className="data text-lg text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {item.name}
                    </h3>
                    <p className="measure mt-2.5 text-[color:var(--muted)]">{item.body}</p>
                  </div>
                  <p className="flex items-start gap-2.5 text-sm leading-6 text-[color:var(--foreground)]/85 lg:pt-1">
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]"
                      aria-hidden="true"
                    />
                    <span>{item.note}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── What you get (deliverables) ──────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">What you get</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">
              Deliverables built for adoption, then implementation.
            </h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              Complete planning outputs, ready to carry into a board packet, a public meeting, and
              a grant submission.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
            {deliverables.map((item, i) => (
              <li key={item} className="flex gap-4 bg-[color:var(--surface)] p-6">
                <span className="data mt-0.5 shrink-0 text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6 text-[color:var(--foreground)]/85">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Related projects ─────────────────────────────────── */}
      <Section spacing="lg" className="border-y border-[color:var(--line)] bg-[color:var(--surface-2)]/50">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="index-label">Selected work</p>
            <h2 className="display-2 mt-5 text-[color:var(--ink)]">How it has gone in practice.</h2>
            <p className="measure mt-5 text-[color:var(--muted)]">
              A few planning projects from my Northern California work, the kind of engagement this
              service is built to deliver.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <Card key={project.title} hover className="flex flex-col">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                  >
                    Read the project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <SectionEndCTA
        heading="Have a planning project on the horizon?"
        subhead="Tell me about your community, your timeline, and the funding you're aiming at. I'll give you an honest read on scope and fit."
        primary={{ href: '/contact?intent=discovery&topic=planning-support', label: 'Talk to Nat' }}
      />
    </>
  )
}
