import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import JsonLd from '@/components/features/json-ld'
import { SignArrow } from '@/components/features/sign-arrow'
import { CaliforniaMap } from '@/components/features/california-map'
import organizationData from '@/data/organization.json'
import { experienceCounties } from '@/data/experience'
import { getLatestOpenPlanRelease } from '@/lib/openplan-release'

const REPO = 'https://github.com/nfredmond/openplan'

// From the "What exists" table in the OpenPlan README. Keep the wording
// in step with the repository; it is the source of truth.
const coverage = [
  {
    work: 'Organize and deliver work',
    exists: 'Projects, milestones, decisions, documents, programs, grants, and reimbursement records.',
  },
  {
    work: 'Understand a place',
    exists: 'GIS intake, corridor analysis, source registries, and safety evidence.',
  },
  {
    work: 'Prepare plans and alternatives',
    exists: 'Land-use plans, regional transportation plan workrooms, scenarios, comparisons, and reports.',
  },
  {
    work: 'Engage the public',
    exists: 'Campaigns, surveys, mapped comments, moderation, and public portals.',
  },
  {
    work: 'Model transportation',
    exists: 'AequilibraE and ActivitySim workers, with results and their provenance kept separate.',
  },
  {
    work: 'Review and share evidence',
    exists: 'Human approvals, reports, selected evidence, and export packages.',
  },
  {
    work: 'Assist planning work',
    exists: 'A grounded assistant whose proposed actions a person reviews before they take effect.',
  },
]

const principles = [
  {
    heading: 'Free and open source',
    body: 'Apache-2.0. No paid tier and no payment step. Optional outside services, such as map tiles or AI providers, may charge for their own use.',
  },
  {
    heading: 'People decide',
    body: 'Cloud AI is optional. Consequential facts, publication, adoption, and money stay under human control.',
  },
  {
    heading: 'Limits stated up front',
    body: 'Model results are not validated forecasts. The repository lists known limitations and what each release has and has not proven.',
  },
]

export default async function HomePage() {
  const release = await getLatestOpenPlanRelease()

  return (
    <>
      <JsonLd data={organizationData} />

      {/* Hero: an overhead guide sign on the corridor */}
      <section className="relative">
        <div className="relative h-[58vh] min-h-[380px] overflow-hidden bg-[color:var(--asphalt)] md:h-[72vh] md:max-h-[760px]">
          <Image
            src="/images/site/drone-corridor-valley-2026-03.jpg"
            alt="Aerial view of a two-lane highway running through a forested valley and a small town"
            fill
            priority
            sizes="100vw"
            className="hero-photo object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
          <p className="absolute bottom-4 right-4 hidden font-ui text-sm text-white/85 md:block">
            Nevada County, CA and surrounding region
          </p>
        </div>

        <Container size="xl" className="relative">
          <div className="hero-sign guide-sign -mt-28 max-w-[44rem] md:-mt-64">
            <div className="guide-sign__face px-6 pb-2 pt-6 md:px-9 md:pt-8">
              <p className="font-ui text-lg font-bold text-white/80 md:text-xl">OpenPlan</p>
              <h1 className="mt-1 font-ui text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-balance">
                Free, open-source software for transportation and land&#8209;use planning
              </h1>
              <nav aria-label="Primary destinations" className="mt-7 border-t-[3px] border-white">
                <ul className="sm:flex">
                  <li className="sm:flex-1">
                    <a href="#what-it-does" className="group flex items-center justify-between gap-4 py-4 sm:pr-6">
                      <span className="font-ui text-xl font-bold group-hover:underline md:text-2xl">
                        What it does
                      </span>
                      <SignArrow className="h-8 w-7 md:h-10 md:w-8" />
                    </a>
                  </li>
                  <li className="border-t-[3px] border-white sm:flex-1 sm:border-l-[3px] sm:border-t-0 sm:pl-6">
                    <a
                      href={REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-ui text-xl font-bold group-hover:underline md:text-2xl">
                        Source code
                      </span>
                      <SignArrow direction="exit" className="h-8 w-7 md:h-10 md:w-8" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </section>

      {/* Summary */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-20">
            <p className="max-w-[42ch] text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.4] text-[color:var(--ink)]">
              OpenPlan brings projects, place-based evidence, analysis, plans, public engagement,
              reports, and implementation records into one application, so a small planning
              staff can run the whole job in one place.
            </p>
            <dl className="space-y-5 border-t-[3px] border-[color:var(--ink)] pt-5 font-ui">
              <div>
                <dt className="label">License</dt>
                <dd className="text-lg text-[color:var(--ink)]">Apache-2.0</dd>
              </div>
              {release ? (
                <div>
                  <dt className="label">Latest release</dt>
                  <dd className="text-lg text-[color:var(--ink)]">
                    <a href={release.url} target="_blank" rel="noopener noreferrer" className="prose-link font-semibold">
                      {release.tag}
                    </a>
                    <span className="text-[color:var(--muted)]">, {release.date}</span>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="label">Status</dt>
                <dd className="text-lg text-[color:var(--ink)]">In active development</dd>
              </div>
              <div>
                <dt className="label">Maintainer</dt>
                <dd className="text-lg text-[color:var(--ink)]">
                  <Link href="/about" className="prose-link font-semibold">
                    Nathaniel Redmond
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* What it does */}
      <section id="what-it-does" className="scroll-mt-16 bg-[color:var(--surface)] py-20 md:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
            <div>
              <h2 className="display-2 text-[color:var(--ink)]">What it covers today</h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Each area has working foundations and known gaps. The repository records both, so
                read the known limitations before relying on an output.
              </p>
              <a
                href={`${REPO}/blob/main/docs/ops/KNOWN_ISSUES.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link mt-6 inline-block font-ui font-semibold"
              >
                Known limitations
              </a>
            </div>
            <dl className="border-t-[3px] border-[color:var(--ink)]">
              {coverage.map((row) => (
                <div
                  key={row.work}
                  className="grid gap-1 border-b border-[color:var(--line)] py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8"
                >
                  <dt className="font-ui text-[1.08rem] font-bold text-[color:var(--ink)]">{row.work}</dt>
                  <dd className="text-[color:var(--muted)]">{row.exists}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-20 md:py-24">
        <Container size="xl">
          <h2 className="display-2 max-w-2xl text-[color:var(--ink)]">How it is built</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {principles.map((item) => (
              <li key={item.heading} className="border-t-[3px] border-[color:var(--pine)] pt-5">
                <h3 className="display-3 text-[color:var(--ink)]">{item.heading}</h3>
                <p className="mt-3 text-[color:var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Try it */}
      <section id="try" className="on-dark scroll-mt-16 bg-[color:var(--sign)] text-white">
        <Container size="xl" className="py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20">
            <div>
              <h2 className="font-ui text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-none tracking-[-0.03em]">
                Run it on your own computer
              </h2>
              <p className="mt-5 max-w-[46ch] text-xl leading-relaxed text-white/85">
                The local evaluation path needs Linux, Node.js 24, Docker, and the Supabase CLI.
                It is for trying OpenPlan, not for running it on the public internet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`${REPO}#running-openplan-on-one-computer`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Setup guide
                </a>
                <a href={`${REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                  How to contribute
                </a>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-md bg-[color:var(--asphalt)] p-6 [font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[0.9rem] leading-relaxed text-white/90">
              <code>{`git clone ${REPO}.git
cd openplan/openplan
npm ci
npm exec -- supabase start
cp .env.example .env.local
# add the local Supabase keys to .env.local
npm exec -- supabase migration up --local
npm run doctor
npm run dev`}</code>
            </pre>
          </div>
        </Container>
      </section>

      {/* Who builds it */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <figure>
              <CaliforniaMap
                highlighted={experienceCounties}
                label={`Map of California highlighting the ${experienceCounties.length} counties where Nathaniel worked on transportation plans and grants: ${experienceCounties.join(', ')}.`}
                className="mx-auto max-w-[22rem]"
              />
              <figcaption className="mt-4 text-sm leading-snug text-[color:var(--muted)]">
                Counties where Nathaniel worked on plans and grant applications, 2021–2025. Source:
                U.S. Census Bureau county boundaries.
              </figcaption>
            </figure>
            <div>
              <h2 className="display-2 text-[color:var(--ink)]">Built by a working planner</h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                Nathaniel Redmond is a transportation planner in Grass Valley, California. He has
                worked on regional plans, active transportation plans, and grant applications in{' '}
                {experienceCounties.length} rural Northern California counties. OpenPlan is built
                around the work those agencies do with small staffs and small budgets.
              </p>
              <p className="measure mt-4 text-[color:var(--muted)]">
                Nat Ford Planning &amp; Analysis is the name he publishes OpenPlan and his other
                open-source planning tools under.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-ui">
                <Link href="/about" className="prose-link font-semibold">
                  About Nathaniel
                </Link>
                <Link href="/software" className="prose-link font-semibold">
                  Other open-source projects
                </Link>
                <Link href="/contact" className="prose-link font-semibold">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
