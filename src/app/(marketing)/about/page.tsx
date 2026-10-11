import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import JsonLd from '@/components/features/json-ld'
import { CaliforniaMap } from '@/components/features/california-map'
import projectsData from '@/data/projects.json'
import { experienceCounties, experienceProjects, priorRoles } from '@/data/experience'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nathaniel Redmond is a transportation planner in Grass Valley, California, and the maintainer of OpenPlan. Master of Urban Planning, San José State University.',
}

const facts = [
  { term: 'Education', detail: 'Master of Urban Planning, San José State University' },
  { term: 'Certification', detail: 'FAA Part 107 remote pilot' },
  { term: 'Based in', detail: 'Grass Valley, California' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={projectsData} />

      <section className="py-16 md:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
            <div className="plate aspect-[4/5] max-w-[20rem]">
              <Image
                src="/images/headshot.png"
                alt="Portrait of Nathaniel Redmond"
                fill
                priority
                sizes="320px"
                className="object-cover object-[center_30%]"
              />
            </div>

            <div>
              <h1 className="display-1 text-[color:var(--ink)]">Nathaniel Redmond</h1>
              <p className="mt-2 font-ui text-xl font-semibold text-[color:var(--pine)]">
                Transportation planner and maintainer of OpenPlan
              </p>
              <div className="measure mt-8 space-y-5 text-[1.15rem]">
                <p>
                  Most of my planning work has been in rural Northern California: regional and
                  active transportation plans, vehicle miles traveled analysis, and the grant
                  applications that pay for the projects those plans recommend.
                </p>
                <p>
                  I started in San Francisco, as an intern at the San Francisco County
                  Transportation Authority, then ran a commuter program for Genentech before
                  moving to rural county work. Small agencies do the same planning as large ones
                  with a fraction of the staff and almost none of the software budget.
                </p>
                <p>
                  That is why I build{' '}
                  <Link href="/" className="prose-link">
                    OpenPlan
                  </Link>{' '}
                  and publish it as open source. Nat Ford Planning &amp; Analysis is the name I
                  publish it under, along with my{' '}
                  <Link href="/software" className="prose-link">
                    other planning tools
                  </Link>
                  .
                </p>
              </div>

              <dl className="mt-10 grid gap-x-10 gap-y-5 border-t-[3px] border-[color:var(--ink)] pt-6 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.term}>
                    <dt className="label">{fact.term}</dt>
                    <dd className="mt-1 font-ui text-[1.05rem] text-[color:var(--ink)]">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section id="experience" className="scroll-mt-16 bg-[color:var(--surface)] py-16 md:py-24">
        <Container size="xl">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <figure>
              <CaliforniaMap
                highlighted={experienceCounties}
                label={`Map of California highlighting ${experienceCounties.join(', ')} counties.`}
                className="mx-auto max-w-[22rem]"
              />
              <figcaption className="mt-3 text-sm text-[color:var(--muted)]">
                {experienceCounties.join(', ')} counties. Source: U.S. Census Bureau county
                boundaries.
              </figcaption>
            </figure>

            <div>
              <h2 className="display-2 text-[color:var(--ink)]">
                Plans and grants in {experienceCounties.length} rural counties
              </h2>
              <p className="measure mt-5 text-[color:var(--muted)]">
                From 2021 to 2025, as a senior transportation planner at Green DOT Transportation
                Solutions. These projects belong to that role. They are not Nat Ford Planning
                &amp; Analysis projects.
              </p>
              <ul className="mt-8 border-t-[3px] border-[color:var(--ink)]">
                {experienceProjects.map((project) => (
                  <li
                    key={project.slug}
                    id={project.slug}
                    className="scroll-mt-24 border-b border-[color:var(--line)] py-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-ui text-[1.1rem] font-bold text-[color:var(--ink)]">{project.title}</h3>
                      <span className="font-ui text-[0.95rem] text-[color:var(--muted)]">
                        {project.type}, {project.year}
                      </span>
                    </div>
                    <p className="measure mt-1 text-[color:var(--muted)]">{project.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="xl">
          <h2 className="display-2 text-[color:var(--ink)]">Career</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {priorRoles.map((role) => (
              <li key={role.employer} className="border-t-[3px] border-[color:var(--pine)] pt-5">
                <p className="font-ui text-[color:var(--muted)]">{role.years}</p>
                <h3 className="mt-1 font-ui text-xl font-bold text-[color:var(--ink)]">{role.title}</h3>
                <p className="font-ui font-semibold text-[color:var(--ink)]">{role.employer}</p>
                <p className="mt-3 text-[color:var(--muted)]">{role.summary}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Contact Nathaniel
            </Link>
            <a
              href="https://www.linkedin.com/in/nfredmond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/nfredmond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              GitHub
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
