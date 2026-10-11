import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import JsonLd from '@/components/features/json-ld'
import { SignArrow } from '@/components/features/sign-arrow'
import { CaliforniaMap } from '@/components/features/california-map'
import organizationData from '@/data/organization.json'
import servicesData from '@/data/services.json'
import projectsData from '@/data/projects.json'
import { experienceCounties, experienceProjects } from '@/data/experience'

const services = [
  {
    id: 'planning',
    name: 'Planning and funding',
    body: 'Regional and active transportation plans, VMT analysis, and grant applications for state and federal programs.',
  },
  {
    id: 'mapping',
    name: 'GIS and aerial mapping',
    body: 'Spatial analysis, web maps for public review, and drone imagery of corridors and sites.',
  },
  {
    id: 'software',
    name: 'Open-source software',
    body: 'Planning tools agencies can inspect and run themselves, with setup and support when they need it.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationData} />
      <JsonLd data={servicesData} />
      <JsonLd data={projectsData} />

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
            Highway corridor, Northern California
          </p>
        </div>

        <Container size="xl" className="relative">
          <div className="hero-sign guide-sign -mt-28 max-w-[44rem] md:-mt-64">
            <div className="guide-sign__face px-6 pb-2 pt-6 md:px-9 md:pt-8">
              <h1 className="font-ui text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-balance">
                Transportation planning for small and rural agencies
              </h1>
              <p className="mt-4 max-w-[34rem] font-ui text-lg leading-snug text-white/85 md:text-xl">
                Plans, grant applications, GIS, and the open-source software behind them.
              </p>
              <nav aria-label="Primary destinations" className="mt-6 border-t-[3px] border-white">
                <ul className="divide-y-[3px] divide-white/0 sm:flex sm:divide-y-0">
                  <li className="sm:flex-1">
                    <Link
                      href="/services"
                      className="group flex items-center justify-between gap-4 py-4 sm:pr-6"
                    >
                      <span className="font-ui text-xl font-bold md:text-2xl group-hover:underline">
                        Planning services
                      </span>
                      <SignArrow className="h-8 w-7 md:h-10 md:w-8" />
                    </Link>
                  </li>
                  <li className="border-t-[3px] border-white sm:flex-1 sm:border-l-[3px] sm:border-t-0 sm:pl-6">
                    <a href="/openplan" className="group flex items-center justify-between gap-4 py-4">
                      <span className="font-ui text-xl font-bold md:text-2xl group-hover:underline">
                        OpenPlan software
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

      {/* Who */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_17rem] lg:gap-20">
            <div>
              <p className="max-w-[40ch] text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.4] text-[color:var(--ink)]">
                I&rsquo;m Nathaniel Redmond, a transportation planner in Grass Valley, California. I
                help counties and regional agencies plan transportation
                projects, find the money to build them, and map the evidence.
              </p>
              <p className="measure mt-6 text-[color:var(--muted)]">
                I also write the software I use, and I publish it under open-source licenses so
                agencies with small budgets can use it too.
              </p>
              <Link href="/about" className="prose-link mt-6 inline-block font-ui font-semibold">
                About Nathaniel
              </Link>
            </div>
            <figure className="max-w-[17rem]">
              <div className="plate aspect-[4/5]">
                <Image
                  src="/images/headshot.png"
                  alt="Portrait of Nathaniel Redmond"
                  fill
                  sizes="272px"
                  className="object-cover object-[center_30%]"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-snug text-[color:var(--muted)]">
                Master of Urban Planning, San Jos&eacute; State University. FAA Part 107 remote pilot.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* What */}
      <section className="border-t border-[color:var(--line)] py-20 md:py-24">
        <Container size="xl">
          <h2 className="display-2 max-w-2xl text-[color:var(--ink)]">Three kinds of work</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {services.map((service) => (
              <li key={service.id} className="border-t-[3px] border-[color:var(--ink)] pt-5">
                <h3 className="display-3 text-[color:var(--ink)]">
                  <Link href={`/services#${service.id}`} className="hover:underline">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 text-[color:var(--muted)]">{service.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Where */}
      <section className="bg-[color:var(--surface)] py-20 md:py-28">
        <Container size="xl">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
            <figure>
              <CaliforniaMap
                highlighted={experienceCounties}
                label={`Map of California highlighting the ${experienceCounties.length} counties where Nathaniel has worked on transportation plans and grants: ${experienceCounties.join(', ')}.`}
                className="mx-auto max-w-[24rem]"
              />
              <figcaption className="mt-4 text-sm leading-snug text-[color:var(--muted)]">
                Counties where Nathaniel worked on plans and grant applications, 2021–2025. Source:
                U.S. Census Bureau county boundaries.
              </figcaption>
            </figure>

            <div>
              <h2 className="display-2 text-[color:var(--ink)]">
                {experienceCounties.length} Northern California counties
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                As a senior planner at Green DOT Transportation Solutions, I worked on regional
                plans, active transportation plans, and grant applications for rural counties
                from the Oregon border to the Sierra Nevada.
              </p>

              <ul className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                {experienceProjects.map((project) => (
                  <li key={project.slug} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span className="font-ui text-[1.05rem] font-bold text-[color:var(--ink)]">
                      {project.title}
                    </span>
                    <span className="font-ui text-[0.95rem] text-[color:var(--muted)] sm:text-right">
                      {project.type}, {project.year}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/projects" className="prose-link mt-6 inline-block font-ui font-semibold">
                Project details and prior roles
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* OpenPlan */}
      <section className="on-dark bg-[color:var(--sign)] text-white">
        <Container size="xl" className="py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-ui text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
                OpenPlan
              </h2>
              <p className="mt-5 max-w-[46ch] text-xl leading-relaxed text-white/85">
                Free, open-source planning software for rural agencies. Projects, funding, maps,
                and reports in one workspace, with the source of every number on record.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/openplan" className="btn btn-primary btn-lg">
                Open OpenPlan
              </a>
              <a
                href="https://github.com/nfredmond/openplan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
              >
                Source code
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <h2 className="display-2 text-[color:var(--ink)]">Start with an email</h2>
          <p className="measure mt-5 text-[color:var(--muted)]">
            Send the project, the deadline, and the funding program if you have one in mind.
          </p>
          <a
            href="mailto:nathaniel@natfordplanning.com"
            className="mt-8 inline-block break-all font-ui text-[clamp(1.4rem,3.6vw,2.6rem)] font-bold tracking-[-0.02em] text-[color:var(--pine)] underline decoration-2 underline-offset-[0.18em] hover:decoration-[3px]"
          >
            nathaniel@natfordplanning.com
          </a>
          <p className="mt-6 font-ui text-[color:var(--muted)]">
            Or use the{' '}
            <Link href="/contact" className="prose-link font-semibold">
              contact form
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  )
}
