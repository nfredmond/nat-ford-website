/**
 * Footer
 * Asphalt band under a double yellow centerline, the one place the
 * centerline appears. Holds the secondary pages so nothing is orphaned.
 */

import Image from 'next/image'
import Link from 'next/link'
import { Container } from './container'

const columns = [
  {
    heading: 'OpenPlan',
    links: [
      { name: 'Overview', href: '/' },
      { name: 'Try OpenPlan', href: '/openplan', external: true },
      { name: 'Source code', href: 'https://github.com/nfredmond/openplan', external: true },
    ],
  },
  {
    heading: 'More',
    links: [
      { name: 'Other software', href: '/software' },
      { name: 'Grant Narrative Lab', href: '/grant-lab' },
      { name: 'Funding readiness scorecard', href: '/funding-readiness-scorecard' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { name: 'AI use and ethics', href: '/ethics' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="on-dark mt-auto">
      <div className="centerline" aria-hidden="true" />
      <div className="bg-[color:var(--asphalt)] text-white">
        <Container size="xl">
          <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-16">
            <div>
              <Link href="/" className="inline-flex rounded-md">
                <span className="sr-only">Nat Ford Planning &amp; Analysis, home</span>
                <Image
                  src="/logos/nf-wordmark-dark.svg"
                  alt=""
                  width={171}
                  height={48}
                  unoptimized
                  className="block h-12 w-auto"
                />
              </Link>
              <address className="mt-6 space-y-1 font-ui text-[0.95rem] not-italic leading-relaxed text-white/75">
                <p>Grass Valley, California</p>
                <p>
                  <a href="mailto:nathaniel@natfordplanning.com" className="hover:text-white hover:underline">
                    nathaniel@natfordplanning.com
                  </a>
                </p>
                <p className="flex gap-4 pt-2">
                  <a
                    href="https://www.linkedin.com/in/nfredmond"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/nfredmond"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              </address>
            </div>

            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="font-ui text-[0.95rem] font-bold text-[color:var(--signal)]">{column.heading}</h2>
                <ul className="mt-4 space-y-2.5 font-ui text-[0.95rem]">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      {'external' in link && link.external ? (
                        <a href={link.href} className="text-white/75 hover:text-white hover:underline">
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-white/75 hover:text-white hover:underline">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/12 py-6 font-ui text-sm text-white/55 sm:flex-row sm:justify-between">
            <p>&copy; {currentYear} Nat Ford Planning &amp; Analysis</p>
            <a
              href="https://github.com/nfredmond/nat-ford-website"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline"
            >
              This website&rsquo;s source code, Apache-2.0
            </a>
          </div>
        </Container>
      </div>
    </footer>
  )
}
