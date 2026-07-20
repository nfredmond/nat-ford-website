/**
 * Header
 * Sticky site navigation. Blur here is justified layering (sticky bar over
 * scrolling content). Nav is normal-case for legibility, not pill chrome.
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
  { name: 'OpenPlan', href: '/openplan' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Planning', href: '/projects' },
  { name: 'Open source', href: '/open-source' },
  { name: 'About', href: '/about' },
]

const CTA_HREF = '/contact?intent=discovery'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <header className="site-header sticky top-0 z-50">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Container size="xl">
        <nav className="flex items-center justify-between py-3" aria-label="Main navigation">
          <Link href="/" className="-m-1.5 flex items-center rounded-md p-1.5">
            <span className="sr-only">Nat Ford Planning & Analysis — home</span>
            <Image
              src="/logos/nf-wordmark-light.png"
              alt="Nat Ford Planning & Analysis"
              width={2048}
              height={683}
              priority
              className="block h-11 w-auto dark:hidden"
            />
            <Image
              src="/logos/nf-wordmark-dark.png"
              alt="Nat Ford Planning & Analysis"
              width={2048}
              height={683}
              className="hidden h-11 w-auto dark:block"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-[0.94rem] font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]'
                    : 'text-[color:var(--muted)] hover:text-[color:var(--ink)]'
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[color:var(--copper)]" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link href={CTA_HREF} className="btn btn-primary btn-sm">
              Talk to Nat
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
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="pb-4 lg:hidden">
            <div className="surface-card space-y-1 p-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 text-base',
                    isActive(item.href)
                      ? 'bg-[color:var(--surface-2)] font-semibold text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]'
                      : 'text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={CTA_HREF}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary btn-md mt-2 w-full"
              >
                Talk to Nat
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
