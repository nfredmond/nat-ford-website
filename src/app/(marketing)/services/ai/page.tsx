import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Github,
  FileCode2,
  GitBranch,
  ListChecks,
  Link2,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'
import { openSourceProjects, licenseLabel } from '@/data/open-source-projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-Enabled Documentation & Custom Software',
  description:
    'Report systems, internal tools, and agent workflows where every figure, table, and claim traces back to a source, and a planner is accountable for the conclusions.',
}

const openplan = openSourceProjects.find((p) => p.slug === 'openplan')!

const deliverables = [
  {
    title: 'Template-driven report assembly',
    body: 'Reusable templates and a documented assembly process, so the next RTP update or grant packet is faster than the last one instead of another copy-paste marathon.',
  },
  {
    title: 'Figure and table pipelines',
    body: 'Maps, charts, and tables generated from source data and regenerated on one command when the numbers change. No stale exhibits nobody remembers how to rebuild.',
  },
  {
    title: 'Citation and assumption checks',
    body: 'Every factual claim traced to a source and every assumption written down, checked before the draft ever leaves your hands.',
  },
  {
    title: 'Editable, disclosure-ready outputs',
    body: 'Deliverables ship as files you can actually edit, Word, Markdown, GeoJSON, with methods and AI use disclosed in plain language.',
  },
]

const method = [
  {
    icon: FileCode2,
    heading: 'Docs an agent can read',
    body: 'Structured Markdown and defined schemas, so your staff and the AI tools work from one source of truth instead of guessing at intent.',
  },
  {
    icon: GitBranch,
    heading: 'CI loops that run locally',
    body: 'Validation, link checks, and citation checks run on every change, on your own machine, before anything is published.',
  },
  {
    icon: ListChecks,
    heading: 'A trace on every output',
    body: 'Each figure, table, and generated paragraph records how it was produced, so a reviewer can follow it back to the data.',
  },
  {
    icon: Link2,
    heading: 'A source on every claim',
    body: 'Generated text has to ground to a verifiable fact. Anything unverified gets flagged, not quietly shipped.',
  },
]

const bestFit = [
  'Small and rural agencies producing recurring plans and reports on a lean crew',
  'Consultancies packaging deliverables under deadline without losing citation integrity',
  'Public-interest teams standardizing their methods and AI-use disclosure',
]

export default function AIServicePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">
                Custom software · AI-assisted documentation
              </p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Documentation that can show its work.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                Automation moves the drafting and packaging faster. It does not get to decide what
                is true. I build report systems, internal tools, and agent workflows where every
                figure, table, and claim traces back to a source, and a planner is still accountable
                for the conclusions.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=ai-documentation">
                    Scope a build <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/openplan">See it in OpenPlan</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full max-w-md">
                <Image
                  src="/images/site/workshop-maps.jpg"
                  alt="Printed plan sets and maps spread across a table during a working planning session"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 05 · Plan review, working session</span>
                  <span className="text-[color:var(--copper)]">Source-traced</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={openplan.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provenance"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  {licenseLabel(openplan)} · {openplan.slug}
                </a>
                <span className="provenance">Northern California</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">What you get</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Four things that ship, and keep working.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                These are the deliverables most documentation and software engagements produce. Each
                one is built to be re-run, not rebuilt from scratch next cycle.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <dl className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {deliverables.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 py-7 sm:grid-cols-[1.5rem_1fr] sm:gap-6"
                >
                  <div
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 translate-y-2.5 rounded-full bg-[color:var(--copper)] sm:block"
                  />
                  <div>
                    <dt className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {item.title}
                    </dt>
                    <dd className="measure mt-2.5 text-[color:var(--muted)]">{item.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── How it holds up ──────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-y border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="index-label text-[color:var(--copper)]">How it holds up</p>
              <h2 className="display-2 mt-5 text-white">Speed you can defend in public.</h2>
              <p className="mt-5 text-white/70">
                The reason these outputs survive a board meeting or a grant reviewer is the plumbing
                underneath them. It is the same discipline that runs inside OpenPlan, applied to your
                reports and tools.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery&topic=ai-documentation">
                    Scope a build <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2">
              {method.map((cell) => {
                const Icon = cell.icon
                return (
                  <li key={cell.heading} className="bg-[#0b120f] p-6">
                    <Icon className="h-5 w-5 text-[color:var(--copper)]" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl font-semibold text-white">
                      {cell.heading}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-white/65">{cell.body}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Accountability + who it's for ────────────────────── */}
      <Section spacing="lg" className="worksurface border-t border-[color:var(--line)]">
        <Container size="xl">
          <div className="surface-card overflow-hidden">
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="p-7 md:p-10">
                <p className="index-label">A person signs the work</p>
                <h2 className="display-3 mt-4 text-[color:var(--ink)]">
                  Automation drafts. I&rsquo;m accountable for what goes out.
                </h2>
                <p className="measure mt-4 text-[color:var(--muted)]">
                  If you need faster output cycles without giving up citation integrity, this is the
                  lane. I&rsquo;m a transportation planner who builds the software too, so the tool
                  and the judgment come from the same place. Tell me what you&rsquo;re producing now
                  and where it&rsquo;s slow.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button asChild size="lg">
                    <Link href="/contact?intent=discovery&topic=ai-documentation">
                      Scope a build <ArrowRight className="h-4 w-4" />
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

              <aside className="border-t border-[color:var(--line)] bg-[color:var(--surface-2)] p-7 md:border-l md:border-t-0 md:p-10">
                <p className="label">Best fit</p>
                <ul className="mt-4 space-y-3">
                  {bestFit.map((who) => (
                    <li
                      key={who}
                      className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--copper)]"
                      />
                      <span>{who}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                >
                  Browse the software
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
