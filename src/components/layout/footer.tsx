/**
 * Footer
 * Forest-night surface with the light wordmark. Also the home for the
 * secondary pages (process, resources, faq, ethics) so nothing is orphaned.
 */

import * as React from 'react'
import Link from 'next/link'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'
import { Container } from './container'
import Image from 'next/image'

const footerLinks = {
  Products: [
    { name: 'OpenPlan', href: '/openplan' },
    { name: 'All software', href: '/products' },
    { name: 'Open-source model', href: '/open-source' },
    { name: 'Grant Narrative Lab', href: '/grant-lab' },
    { name: 'Funding readiness', href: '/funding-readiness-scorecard' },
  ],
  Services: [
    { name: 'Transportation planning', href: '/services/planning' },
    { name: 'GIS & spatial analysis', href: '/services/gis' },
    { name: 'Aerial mapping', href: '/services/aerial' },
    { name: 'Grants & funding', href: '/services/grants' },
    { name: 'Custom software', href: '/services/ai' },
  ],
  Practice: [
    { name: 'About', href: '/about' },
    { name: 'Planning work', href: '/projects' },
    { name: 'How the work runs', href: '/process' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Ethics & AI disclosure', href: '/ethics' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="on-dark mt-auto border-t border-white/10 bg-[#0b120f] text-white">
      <Container size="xl">
        <div className="py-14 md:py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-flex rounded-md">
                <Image
                  src="/logos/nf-wordmark-dark.png"
                  alt="Nat Ford Planning & Analysis"
                  width={2048}
                  height={683}
                  className="block h-12 w-auto"
                />
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
                Open-source planning software and the planning work around it —
                for the small and rural agencies that keep the map honest.
              </p>

              <div className="mt-6 space-y-2.5 text-sm text-white/70">
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-[color:var(--copper)]" aria-hidden="true" />
                  Sierra foothills · Grass Valley, California
                </p>
                <a
                  href="mailto:nathaniel@natfordplanning.com"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[color:var(--copper)]" aria-hidden="true" />
                  nathaniel@natfordplanning.com
                </a>
              </div>

              <div className="mt-6 flex gap-2.5">
                <a
                  href="https://github.com/nfredmond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-white hover:text-white"
                  aria-label="GitHub — github.com/nfredmond"
                >
                  <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nfredmond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-white hover:text-white"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h2 className="label">{heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/72 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} Nat Ford Planning &amp; Analysis</p>
            <p className="font-mono text-[0.72rem] tracking-wide text-white/45">
              Built in the open · github.com/nfredmond
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
