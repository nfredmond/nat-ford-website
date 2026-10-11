import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { isFeaturedPublicRepo, openSourceProjects } from '@/data/open-source-projects'

export const metadata: Metadata = {
  title: 'Software',
  description:
    'OpenPlan and other open-source tools by Nathaniel Redmond for transportation planning, GIS, drone mapping, and scenario modeling.',
}

export default function SoftwarePage() {
  const openplan = openSourceProjects.find((p) => p.slug === 'openplan')!
  const catalog = openSourceProjects.filter((p) => isFeaturedPublicRepo(p) && p.slug !== 'openplan')

  return (
    <>
      <section className="py-16 md:py-24">
        <Container size="xl">
          <h1 className="display-1 max-w-[18ch] text-[color:var(--ink)]">
            Open-source software for planning work
          </h1>
          <p className="lead measure mt-6 text-[color:var(--muted)]">
            Every project here is public. Read the code, run it yourself, or adapt it for your
            agency under its license.
          </p>
        </Container>
      </section>

      <section id="openplan" className="on-dark scroll-mt-16 bg-[color:var(--sign)] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="px-4 py-16 sm:px-6 md:py-20 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pr-16">
            <h2 className="font-ui text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
              {openplan.name}
            </h2>
            <p className="mt-5 max-w-[44ch] text-xl leading-relaxed text-white/85">{openplan.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary btn-lg">
                About OpenPlan
              </Link>
              <a href={openplan.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                Source code
              </a>
            </div>
            <p className="mt-6 font-ui text-sm text-white/65">License: {openplan.licenseSpdx}</p>
          </div>
          <figure className="relative min-h-72">
            <Image
              src="/images/site/drone-town-overview-2026-03.jpg"
              alt="Aerial view of a small mountain town and its street grid, with forested ridges behind"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 right-4 font-ui text-sm text-white/85">
              Nevada County, CA and surrounding region
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Container size="xl">
          <h2 className="display-2 text-[color:var(--ink)]">Other projects</h2>
          <ul className="mt-10 border-t-[3px] border-[color:var(--ink)]">
            {catalog.map((project) => (
              <li
                key={project.slug}
                className="grid gap-3 border-b border-[color:var(--line)] py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
              >
                <div>
                  <h3 className="font-ui text-xl font-bold text-[color:var(--ink)]">{project.name}</h3>
                  <p className="font-ui text-[0.95rem] text-[color:var(--muted)]">{project.category}</p>
                </div>
                <p className="measure text-[color:var(--muted)]">{project.summary}</p>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-ui text-[0.95rem]">
                  <span className="text-[color:var(--muted)]">{project.licenseSpdx}</span>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="prose-link font-semibold">
                    Source
                  </a>
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="prose-link font-semibold">
                      Demo
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-[color:var(--surface)] py-16 md:py-20">
        <Container size="xl">
          <h2 className="display-3 text-[color:var(--ink)]">Free tools on this site</h2>
          <ul className="mt-6 grid gap-8 md:grid-cols-2">
            <li>
              <Link href="/funding-readiness-scorecard" className="prose-link font-ui text-lg font-semibold">
                Funding readiness scorecard
              </Link>
              <p className="mt-1 text-[color:var(--muted)]">
                A self-check on whether a project is ready for a funding application.
              </p>
            </li>
            <li>
              <Link href="/grant-lab" className="prose-link font-ui text-lg font-semibold">
                Grant Narrative Lab
              </Link>
              <p className="mt-1 text-[color:var(--muted)]">
                An AI drafting tool for grant narratives, organized around each program&rsquo;s
                scoring criteria.
              </p>
            </li>
          </ul>
        </Container>
      </section>
    </>
  )
}
