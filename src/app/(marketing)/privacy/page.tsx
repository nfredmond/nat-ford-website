import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Nat Ford Planning & Analysis collects, uses, and protects the information you share when you use our services and products.',
}

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: 'What I collect',
    body: 'When you send the contact form: your name, email, organization, and what you write about your project, plus your IP address and browser identifier for spam control. If you create an account: your email and sign-in records. If you buy something: the purchase record (product, tier, your email) — card numbers go to Stripe and never touch this site. Nothing else is collected. There are no advertising or analytics trackers on this site.',
  },
  {
    heading: 'Services that process data on my behalf',
    body: 'This site runs on a small set of processors: Supabase stores the database and handles accounts; Stripe handles payments; Cloudflare Turnstile screens the contact form for bots; Vercel hosts the site and keeps standard server logs; Resend sends the purchase-confirmation email. If you type a location into the Grant Lab map preview, that text goes to Mapbox to draw the map. Each processor receives only what its job requires.',
  },
  {
    heading: 'The AI tools',
    body: 'What you type into the planning copilot or the Grant Narrative Lab is sent to OpenAI to generate the response. I log usage events — timestamps, estimated token counts, IP address, and a per-browser visitor id — to enforce rate limits and stop abuse; I do not use your prompts to train anything. If you supply your own OpenAI API key, it stays in your browser (session-only unless you opt to remember it on your device) and is sent with your requests; it is never stored on my server.',
  },
  {
    heading: 'In your browser',
    body: 'Local storage holds your theme preference, the chat visitor id, and — only if you switch on local autosave — your Grant Lab drafts. Cookies are functional only: sign-in sessions and anti-spam verification. No third-party advertising cookies, ever.',
  },
  {
    heading: 'Client work and AI',
    body: 'For paid engagements: AI-assisted workflows may process project content for drafting and analysis support, final conclusions are reviewed by me, and client data is not reused across clients without explicit permission.',
  },
  {
    heading: 'Retention and your rights',
    body: 'Contact-form submissions are kept for business follow-up; account and purchase records are kept as long as your account or my legal obligations require. Email me and I will tell you what I hold about you, correct it, or delete it — deletion requests are honored unless a legal or accounting obligation requires keeping a record.',
  },
  {
    heading: 'Contact',
    body: (
      <>
        Privacy questions:{' '}
        <a
          href="mailto:nathaniel@natfordplanning.com"
          className="font-medium text-[color:var(--pine)] underline underline-offset-2 hover:text-[color:var(--pine-deep)] dark:text-[color:var(--pine-soft)]"
        >
          nathaniel@natfordplanning.com
        </a>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="worksurface relative overflow-hidden border-b border-[color:var(--line)]">
        <Container size="lg" className="relative py-16 md:py-20">
          <div className="measure-wide">
            <p className="index-label">Legal</p>
            <h1 className="display-2 mt-6 text-[color:var(--ink)]">Privacy Policy</h1>
            <p className="data mt-6 text-sm text-[color:var(--muted)]">
              Last updated: July 20, 2026
            </p>
          </div>
        </Container>
      </section>

      {/* ── Policy ────────────────────────────────────────────── */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="measure-wide">
            <p className="lead text-[color:var(--muted)]">
              This policy names what this site actually collects, every service that touches your
              data, and how to get your data corrected or deleted. Nothing here is sold, and there
              are no advertising trackers.
            </p>

            <div className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {sections.map((section, i) => (
                <section
                  key={section.heading}
                  className="grid gap-2 py-8 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="data text-sm text-[color:var(--copper-ink)] dark:text-[color:var(--copper)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                      {section.heading}
                    </h2>
                    <p className="mt-3 leading-7 text-[color:var(--muted)]">{section.body}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
