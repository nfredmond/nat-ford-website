import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { priorRoles } from '@/data/experience'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nathaniel Redmond is a transportation planner in Grass Valley, California, with a Master of Urban Planning from San José State University. He founded Nat Ford Planning & Analysis and builds open-source planning software.',
}

const facts = [
  { term: 'Education', detail: 'Master of Urban Planning, San José State University' },
  { term: 'Certification', detail: 'FAA Part 107 remote pilot' },
  { term: 'Based in', detail: 'Grass Valley, California' },
  { term: 'Works', detail: 'Remotely across California, with site visits when a project needs them' },
]

export default function AboutPage() {
  return (
    <>
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
                Founder, Nat Ford Planning &amp; Analysis
              </p>
              <div className="measure mt-8 space-y-5 text-[1.15rem]">
                <p>
                  I&rsquo;m a transportation planner. Most of my work has been in rural Northern
                  California, writing regional and active transportation plans, analyzing
                  vehicle miles traveled, and building the grant applications that pay for the
                  projects those plans recommend.
                </p>
                <p>
                  I started in San Francisco, as an intern at the San Francisco County
                  Transportation Authority, then ran a commuter program for Genentech before
                  moving to rural county work. Small agencies do the same planning as large ones
                  with a fraction of the staff and almost none of the software budget.
                </p>
                <p>
                  That is why I build planning software and publish it as open source. The same
                  person writes the code and the memo, so the methods are stated and the
                  numbers can be checked.
                </p>
              </div>

              <dl className="mt-10 grid gap-x-10 gap-y-5 border-t-[3px] border-[color:var(--ink)] pt-6 sm:grid-cols-2">
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

      <section className="bg-[color:var(--surface)] py-16 md:py-24">
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
          <Link href="/projects" className="prose-link mt-10 inline-block font-ui font-semibold">
            Selected projects from these roles
          </Link>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="xl">
          <h2 className="display-2 text-[color:var(--ink)]">Get in touch</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Contact form
            </Link>
            <a href="mailto:nathaniel@natfordplanning.com" className="btn btn-outline btn-lg">
              nathaniel@natfordplanning.com
            </a>
            <a
              href="https://www.linkedin.com/in/nfredmond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              LinkedIn
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
