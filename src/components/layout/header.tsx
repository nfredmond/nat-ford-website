/**
 * Header
 * Sticky site navigation. OpenPlan is a separate app mounted at /openplan,
 * so it is a plain anchor (full page load), not a client-side Link.
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Container } from './container'
import { ThemeToggle } from '../ui/theme-toggle'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Experience', href: '/projects' },
  { name: 'Software', href: '/software' },
  { name: 'OpenPlan', href: '/openplan', external: true },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const linkClass = (href: string) =>
    cn(
      'relative px-3 py-2 text-[0.98rem] font-semibold transition-colors',
      isActive(href)
        ? 'text-[color:var(--ink)] after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[3px] after:bg-[color:var(--pine)]'
        : 'text-[color:var(--muted)] hover:text-[color:var(--ink)]'
    )

  return (
    <header className="site-header sticky top-0 z-50">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Container size="xl">
        <nav className="flex items-center justify-between py-2.5" aria-label="Main navigation">
          <Link href="/" className="-m-1.5 flex items-center rounded-md p-1.5">
            <span className="sr-only">Nat Ford Planning &amp; Analysis, home</span>
            <Image
              src="/logos/nf-wordmark-light-cropped.png"
              alt=""
              width={147}
              height={36}
              priority
              className="block h-9 w-auto dark:hidden"
            />
            <Image
              src="/logos/nf-wordmark-dark-cropped.png"
              alt=""
              width={164}
              height={36}
              className="hidden h-9 w-auto dark:block"
            />
          </Link>

          <div className="hidden items-center lg:flex">
            {navigation.map((item) =>
              item.external ? (
                <a key={item.name} href={item.href} className={linkClass(item.href)}>
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={linkClass(item.href)}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary btn-sm">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="btn btn-ghost btn-sm -mr-2 px-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-[color:var(--line)] pb-5 pt-2 lg:hidden">
            <ul className="divide-y divide-[color:var(--line)]">
              {[...navigation, { name: 'Contact', href: '/contact', external: false }].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.href} className="block py-3 text-lg font-semibold text-[color:var(--ink)]">
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block py-3 text-lg font-semibold',
                        isActive(item.href) ? 'text-[color:var(--pine)]' : 'text-[color:var(--ink)]'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}
