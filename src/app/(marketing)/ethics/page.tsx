import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ContourField } from '@/components/features/contour-field'

export const metadata: Metadata = {
  title: 'Ethics & AI Disclosure',
  description:
    'How Nat Ford Planning & Analysis handles pricing, AI in deliverables, client data, and community benefit, stated plainly so you can hold me to it.',
}

const covenant = [
  {
    title: 'Truth without spin.',
    body: 'Every deliverable states its assumptions and its limits. When a number is screening-grade rather than a calibrated forecast, it says so on the page, not in a footnote you have to hunt for.',
  },
  {
    title: 'Fair, posted pricing.',
    body: 'Rates are the same whether you found me on a good week or a desperate one. Pricing is set to keep the practice sustainable, not to capture what a deadline is worth to you.',
  },
  {
    title: 'Protect the people with the least room.',
    body: 'Recommendations do not shift cost, risk, or burden onto disadvantaged or tribal communities to make a project pencil out. If the math only works by doing that, the math is wrong.',
  },
  {
    title: 'Fix it fast, and out loud.',
    body: 'When scope, schedule, or quality slips, you hear it from me early, with a plan to correct it. Not after the invoice, and not dressed up as something else.',
  },
  {
    title: 'Community benefit is built in.',
    body: 'Reduced-rate capacity for under-resourced agencies is part of how the practice runs. It is tracked as an operating commitment, not dropped the first busy quarter.',
  },
]

export default function EthicsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <ContourField animate className="opacity-90" />
        <Container size="xl" className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="index-label reveal reveal-1">Ethics &amp; AI disclosure</p>
              <h1 className="display-1 reveal reveal-2 mt-6 text-[color:var(--ink)]">
                How I work, written down so you can hold me to it.
              </h1>
              <p className="lead reveal reveal-3 measure-wide mt-6 text-[color:var(--muted)]">
                This is public work. It ends up in front of boards, in grant files, and in the
                public record. So the standards behind it are public too: fair exchange, honest
                methods, and community benefit that shows up in the operating budget, not just the
                brochure.
              </p>
              <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=discovery">
                    Talk to Nat <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a href="mailto:nathaniel@natfordplanning.com" className="btn btn-outline btn-lg">
                  nathaniel@natfordplanning.com
                </a>
              </div>
            </div>

            {/* Figure plate */}
            <figure className="reveal reveal-5 w-full max-w-md lg:justify-self-end">
              <div className="plate aspect-[4/5] w-full">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down aerial capture of a rural intersection and its surrounding street grid"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f]/78 via-transparent to-transparent" />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 01 · Intersection, top-down capture</span>
                  <span className="text-[color:var(--copper)]">On the record</span>
                </figcaption>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="provenance">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Standards, stated plainly
                </span>
                <span className="provenance">Northern California</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Business covenant ────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="index-label">The covenant</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Five commitments that hold whether or not you are watching.
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                These are the terms I run the practice on. None of them are conditional on the size
                of the contract or the pressure of the calendar.
              </p>
            </div>

            <ol className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {covenant.map((item, i) => (
                <li key={item.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="data text-lg text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="measure mt-2.5 text-[color:var(--muted)]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── Client AI disclosure ─────────────────────────────── */}
      <section className="on-dark relative overflow-hidden border-y border-white/10 bg-[#0b120f] text-white">
        <ContourField className="opacity-60" />
        <Container size="xl" className="relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="index-label text-[color:var(--copper)]">AI disclosure</p>
              <h2 className="display-2 mt-5 text-white">
                Where AI shows up in your deliverables.
              </h2>
              <p className="mt-5 text-white/70">
                I use AI where it earns its place, and I tell you where that is. It never signs off
                on the work in your name.
              </p>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2">
              <li className="bg-[#0b120f] p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  What AI helps with
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/65">
                  Drafting, data preparation, and formatting move faster with AI in the loop. It
                  handles the mechanical parts so more of my time goes to the judgment calls.
                </p>
              </li>
              <li className="bg-[#0b120f] p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  What a person still owns
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/65">
                  Every analysis, conclusion, and recommendation is reviewed and approved by a
                  qualified planner. That is where accountability sits, and it does not move.
                </p>
              </li>
              <li className="bg-[#0b120f] p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  Claims carry their source
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/65">
                  Regulatory or technical claims are citation-backed, or they are flagged in plain
                  sight for verification before you rely on them.
                </p>
              </li>
              <li className="bg-[#0b120f] p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  Methods travel with the work
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/65">
                  Deliverables include the methods and assumptions behind them, written to stand up
                  to client and public review, not just to close the file.
                </p>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Data & community commitments ─────────────────────── */}
      <Section spacing="lg" className="worksurface">
        <Container size="xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="index-label">Data &amp; community</p>
              <h2 className="display-2 mt-5 text-[color:var(--ink)]">
                Your data stays yours. So does the benefit.
              </h2>
              <div className="mt-6 space-y-5">
                <p className="measure text-[color:var(--foreground)]/85">
                  Client data is never sold, and it is not reused across clients without your
                  explicit permission. Sensitive data is kept to the minimum the work requires,
                  access-controlled, and retained only as long as it is needed.
                </p>
                <p className="measure text-[color:var(--foreground)]/85">
                  Alongside that, I hold hardship capacity for under-resourced agencies and track
                  community-benefit commitments as part of running the practice. When a small county
                  needs the work and cannot pay full freight, that is a case the model is built to
                  serve, not an exception I make grudgingly.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild>
                  <Link href="/contact?intent=discovery">
                    Ask how this applies to you <ArrowRight className="h-4 w-4" />
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

            <figure className="w-full max-w-lg lg:justify-self-end">
              <div className="plate aspect-[5/4] w-full">
                <Image
                  src="/images/site/drone-town-overview-2026-03.jpg"
                  alt="Aerial overview of a small Northern California town and its street grid"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <figcaption className="plate-caption absolute inset-x-4 bottom-3.5 flex items-center justify-between">
                  <span>Fig. 02 · Small town, aerial capture</span>
                  <span className="text-[color:var(--copper)]">FAA Part 107</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </Container>
      </Section>
    </>
  )
}
