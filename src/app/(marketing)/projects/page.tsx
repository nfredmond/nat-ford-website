import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import JsonLd from '@/components/features/json-ld'
import { CaliforniaMap } from '@/components/features/california-map'
import projectsData from '@/data/projects.json'
import { experienceCounties, experienceProjects, priorRoles } from '@/data/experience'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Regional transportation plans, active transportation plans, VMT analysis, and grant applications across 14 Northern California counties, delivered on staff at Green DOT Transportation Solutions.',
}

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={projectsData} />

      <section className="py-16 md:py-24">
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
            <div>
              <h1 className="display-1 max-w-[14ch] text-[color:var(--ink)]">
                Plans and grants in {experienceCounties.length} rural counties
              </h1>
              <p className="lead measure mt-6 text-[color:var(--muted)]">
                From 2021 to 2025, I worked on regional plans, active transportation plans, and
                grant applications as a senior transportation planner at Green DOT Transportation
                Solutions.
              </p>
              <p className="measure mt-4 text-[color:var(--muted)]">
                The projects below belong to that role. They are not Nat Ford Planning &amp;
                Analysis client projects.
              </p>
            </div>
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
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--surface)] py-16 md:py-24">
        <Container size="xl">
          <h2 className="display-2 text-[color:var(--ink)]">Selected projects</h2>
          <ol className="mt-10 border-t-[3px] border-[color:var(--ink)]">
            {experienceProjects.map((project) => (
              <li
                key={project.slug}
                id={project.slug}
                className="grid scroll-mt-24 gap-4 border-b border-[color:var(--line)] py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12"
              >
                <div className="font-ui">
                  <p className="font-bold text-[color:var(--ink)]">{project.county} County</p>
                  <p className="text-[color:var(--muted)]">
                    {project.type}, {project.year}
                  </p>
                </div>
                <div>
                  <h3 className="display-3 text-[color:var(--ink)]">{project.title}</h3>
                  <p className="measure mt-2 text-[color:var(--muted)]">{project.summary}</p>
                  {project.work ? (
                    <ul className="measure mt-4 space-y-2">
                      {project.work.map((item) => (
                        <li key={item} className="flex items-baseline gap-3 text-[1.02rem]">
                          <span aria-hidden="true" className="lane-dash shrink-0 -translate-y-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="display-2 text-[color:var(--ink)]">Prior roles</h2>
              <ol className="mt-8 space-y-8">
                {priorRoles.map((role) => (
                  <li key={role.employer} className="border-l-[3px] border-[color:var(--pine)] pl-5">
                    <p className="font-ui text-[color:var(--muted)]">{role.years}</p>
                    <h3 className="font-ui text-xl font-bold text-[color:var(--ink)]">
                      {role.title}, {role.employer}
                    </h3>
                    <p className="measure mt-2 text-[color:var(--muted)]">{role.summary}</p>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="self-start">
              <div className="plate aspect-[16/10]">
                <Image
                  src="/images/site/drone-mainstreet-parking-2026-03.jpg"
                  alt="Drone photo of a small-town main street with angled parking, street trees, and a stop-controlled intersection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-[color:var(--muted)]">
                Main street parking, Plumas County. Drone capture.
              </figcaption>
              <Link href="/contact" className="btn btn-primary btn-lg mt-10">
                Contact Nathaniel
              </Link>
            </figure>
          </div>
        </Container>
      </section>
    </>
  )
}
