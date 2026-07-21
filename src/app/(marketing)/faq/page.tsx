import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, Github, Plus } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import JsonLd from '@/components/features/json-ld'
import { ContourField } from '@/components/features/contour-field'
import { openSourceProjects, licenseLabel } from '@/data/open-source-projects'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Straight answers on scope, FAA Part 107 aerial work, deliverable formats, timelines, data privacy, and how the open-source model works.',
}

const openplan = openSourceProjects.find((p) => p.slug === 'openplan')!

type FaqItem = {
  q: string
  a: string
  link?: { label: string; href: string }
}

const faqGroups: { label: string; items: FaqItem[] }[] = [
  {
    label: 'Scope & engagement',
    items: [
      {
        q: 'What services do you provide?',
        a: 'Planning strategy, GIS and spatial analytics, aerial mapping support, grant competitiveness work, and AI-assisted documentation workflows with human-reviewed output.',
        link: { label: 'All services', href: '/services' },
      },
      {
        q: 'How does the open-source model work?',
        a: 'The planning tools are public repositories under Apache-2.0 or AGPL. You can read the code, fork it, or self-host at no cost. Paid work covers the parts that are hard to keep running: deployment, hosting, a fork tuned to your agency, staff onboarding, and support when it has to work on a deadline.',
        link: { label: 'How the model works', href: '/open-source' },
      },
      {
        q: 'What work is explicitly out of scope?',
        a: 'I do not provide legal boundary surveying unless a licensed partner is engaged, and I avoid speculative visuals that could be mistaken for approved design.',
      },
    ],
  },
  {
    label: 'Aerial & precision',
    items: [
      {
        q: 'Are you FAA Part 107 certified?',
        a: 'Yes. FAA Part 107 operations run with site-specific risk checks and the required authorizations for controlled airspace.',
      },
      {
        q: 'Do you provide survey-grade measurements?',
        a: 'Default deliverables are planning-grade. When survey-grade precision is required, scope includes control and check workflows and licensed-surveyor coordination where needed.',
      },
    ],
  },
  {
    label: 'Deliverables & timeline',
    items: [
      {
        q: 'What deliverable formats do you support?',
        a: 'Typical outputs include GeoPackage and GeoJSON, web map apps, PDF and DOCX reports, GeoTIFF orthomosaics, terrain products, and presentation-ready graphics.',
      },
      {
        q: 'What do you need from clients to begin?',
        a: 'A decision owner, the geography or corridor boundary, known constraints, key dates, and whatever data you already have. That is enough to structure an intake scope quickly.',
      },
      {
        q: 'What is a typical timeline?',
        a: 'It depends on scope. Light diagnostics can land in 1–2 weeks, corridor studies often run 4–8 weeks, and larger planning packages run 8–16+ weeks.',
      },
    ],
  },
  {
    label: 'Your data',
    items: [
      {
        q: 'What is your data and privacy posture?',
        a: 'Client data is used only for the contracted work, access-controlled, and never sold. Sensitive information is minimized and retained only as long as needed.',
      },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups
    .flatMap((group) => group.items)
    .map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
}

export default function FAQPage() {
  // Continuous mono index across every group (01, 02, …).
  const groups = faqGroups.map((group, idx) => ({
    ...group,
    start: faqGroups.slice(0, idx).reduce((sum, g) => sum + g.items.length, 0),
  }))

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Reference · common questions</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                Straight answers before the work starts.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                What I get asked most, on scope, aerial operations, deliverable formats, timelines,
                and data. If your question isn&rsquo;t here, send it and a real planner will answer.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Talk to Nat <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Browse services</Link>
                </Button>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 w-full max-w-md lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full">
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
                  <span>Fig. 01 · Rural corridor</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
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
                <span className="provenance">Sierra foothills, CA</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── The questions ────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">How to read this</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Everything I get asked, grouped.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Answers are plain and current. Where the honest answer is &ldquo;it depends,&rdquo; it
                says so, and it says on what. Anything you don&rsquo;t see, ask directly.
              </p>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              >
                nathaniel@natfordplanning.com
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="space-y-12">
              {groups.map((group) => (
                <div key={group.label}>
                  <h3 className="label text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {group.label}
                  </h3>
                  <div className="mt-4 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                    {group.items.map((item, i) => {
                      const n = String(group.start + i + 1).padStart(2, '0')
                      return (
                        <details key={item.q} className="group">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                            <span className="flex items-start gap-4">
                              <span className="data mt-1.5 text-xs text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                                {n}
                              </span>
                              <span className="font-display text-xl font-semibold text-[color:var(--ink)]">
                                {item.q}
                              </span>
                            </span>
                            <Plus
                              className="mt-1.5 h-5 w-5 shrink-0 text-[color:var(--pine)] transition-transform duration-200 group-open:rotate-45 dark:text-[color:var(--pine-soft)]"
                              aria-hidden="true"
                            />
                          </summary>
                          <div className="pb-6 pl-[2.75rem] pr-2">
                            <p className="measure text-[color:var(--muted)]">{item.a}</p>
                            {item.link && (
                              <Link
                                href={item.link.href}
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
                              >
                                {item.link.label}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        </details>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-t border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="index-label text-[color:var(--copper)]">Still have a question</p>
            <h2 className="display-2 mt-5 text-white">Ask the person who does the work.</h2>
            <p className="mt-5 text-white/70">
              No sales team and no funnel. Tell me the geography, the deadline, and what you&rsquo;re
              trying to decide, and I&rsquo;ll tell you whether this is a fit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="/contact?intent=discovery">
                  Talk to Nat <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <a
                href="mailto:nathaniel@natfordplanning.com"
                className="font-mono text-sm text-white/80 hover:text-white hover:underline"
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
