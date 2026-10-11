import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import JsonLd from '@/components/features/json-ld'
import servicesData from '@/data/services.json'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Transportation plans, grant applications, GIS and aerial mapping, and open-source planning software for small and rural public agencies.',
}

const sections = [
  {
    id: 'planning',
    name: 'Planning and funding',
    intro:
      'Plans that a board can adopt and a funding program can score. The analysis, the project list, and the grant narrative come from the same source data, so the numbers match from plan to application.',
    items: [
      'Regional transportation plans (RTPs)',
      'Active transportation plans (ATPs) and Safe Routes to School',
      'Vehicle-miles-traveled (VMT) analysis and capital improvement programs',
      'Grant strategy and applications: ATP, HSIP, CRP, CMAQ, and FTA 5310, 5311, and 5339',
      'Staff reports, board presentations, and public meeting materials',
    ],
    contact: { label: 'Ask about planning work', href: '/contact?intent=discovery&topic=planning-support' },
  },
  {
    id: 'mapping',
    name: 'GIS and aerial mapping',
    intro:
      'Maps that carry their sources. Collision, traffic, census, and asset data go into one spatial database, and every figure lists where its data came from and when.',
    items: [
      'Spatial analysis in PostGIS and QGIS',
      'Collision, access, and network-gap analysis',
      'Web maps for public review and comment',
      'FAA Part 107 drone capture, orthomosaics, and terrain models of corridors and sites',
      'Figure sets for plans and grant applications',
    ],
    contact: { label: 'Ask about GIS or drone work', href: '/contact?intent=discovery&topic=gis-mapping' },
  },
  {
    id: 'software',
    name: 'Open-source software',
    intro:
      'The tools I build for my own planning work are public. An agency can read the code, run it on its own servers, or have me set it up and keep it running.',
    items: [
      'Hosted setup of OpenPlan or another project in the catalog',
      'Custom versions with an agency’s own data, templates, and permissions',
      'Staff training and written administration guides',
      'Ongoing support, updates, and fixes',
    ],
    link: { label: 'See the software catalog', href: '/software' },
    contact: { label: 'Ask about software support', href: '/contact?intent=discovery&topic=open-source-support' },
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesData} />

      <section className="py-16 md:py-24">
        <Container size="xl">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_22rem] lg:gap-20">
            <div>
              <h1 className="display-1 max-w-[16ch] text-[color:var(--ink)]">
                Plans, funding, maps, and the software behind them
              </h1>
              <p className="lead measure mt-6 text-[color:var(--muted)]">
                For counties, regional transportation planning agencies, cities, and the
                consultants who support them.
              </p>
              <nav aria-label="Services on this page" className="mt-10">
                <ul className="flex flex-wrap gap-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="btn btn-outline btn-md">
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <figure className="hidden lg:block">
              <div className="plate aspect-[9/14]">
                <Image
                  src="/images/site/drone-intersection-topdown-2026-03.jpg"
                  alt="Top-down drone photo of a small-town intersection with crosswalks, angled parking, and a civic building"
                  fill
                  priority
                  sizes="352px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-[color:var(--muted)]">
                Downtown intersection, Northern California. Drone capture.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={i % 2 === 0 ? 'scroll-mt-20 bg-[color:var(--surface)] py-16 md:py-24' : 'scroll-mt-20 py-16 md:py-24'}
        >
          <Container size="xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
              <div>
                <h2 className="display-2 text-[color:var(--ink)]">{section.name}</h2>
                <p className="measure mt-5 text-[color:var(--muted)]">{section.intro}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={section.contact.href} className="btn btn-primary btn-md">
                    {section.contact.label}
                  </Link>
                  {section.link ? (
                    <Link href={section.link.href} className="prose-link font-ui font-semibold">
                      {section.link.label}
                    </Link>
                  ) : null}
                </div>
              </div>
              <ul className="border-t-[3px] border-[color:var(--ink)]">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-b border-[color:var(--line)] py-4 font-ui text-[1.08rem] text-[color:var(--ink)]"
                  >
                    <span aria-hidden="true" className="lane-dash shrink-0 -translate-y-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-[color:var(--line)] py-16 md:py-20">
        <Container size="xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="display-3 text-[color:var(--ink)]">Free tools</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <Link href="/funding-readiness-scorecard" className="prose-link font-ui font-semibold">
                    Funding readiness scorecard
                  </Link>
                  <p className="mt-1 text-[color:var(--muted)]">
                    A self-check on whether a project is ready for a funding application.
                  </p>
                </li>
                <li>
                  <Link href="/grant-lab" className="prose-link font-ui font-semibold">
                    Grant Narrative Lab
                  </Link>
                  <p className="mt-1 text-[color:var(--muted)]">
                    An AI drafting tool for grant narratives, organized around each program&rsquo;s scoring criteria.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="display-3 text-[color:var(--ink)]">Discuss a project</h2>
              <p className="mt-5 text-[color:var(--muted)]">
                Send the scope, the deadline, and the funding program if there is one.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Contact Nathaniel
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
