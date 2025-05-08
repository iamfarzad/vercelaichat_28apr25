'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';
import SearchBar from '@/components/search-bar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

export function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute left-4 top-2 z-50 bg-white text-black px-3 py-1 rounded"
      >
        Skip to content
      </a>
      <div className="container flex items-center h-16 px-4 relative">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Go to homepage"
        >
          <span className="relative flex items-center">
            <span
              className="absolute size-2 rounded-full bg-brand-orange animate-glow-dot transition-colors duration-300"
              style={{ boxShadow: '0 0 8px 2px oklch(0.686 0.219 41.6)' }}
              aria-hidden="true"
            />
          </span>
          <span className="font-bold text-xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] bg-clip-text text-transparent ml-4">
            F.B Consulting
          </span>
        </Link>

        {/* Centered nav */}
        {!isMobile && (
          <nav
            className="flex-1 flex justify-center"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm text-muted-foreground hover:text-brand-orange transition-colors ${
                    pathname === link.href
                      ? 'font-bold text-brand-orange underline underline-offset-4'
                      : ''
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-4 shrink-0 ml-auto">
          <SearchBar />
          <ThemeToggle />
          {/* Mobile hamburger menu (right-aligned) */}
          {isMobile && (
            <div className="flex items-center">
              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <span className="sr-only">
                  {mobileMenuOpen ? 'Close menu' : 'Open menu'}
                </span>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-brand-orange"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  )}
                </svg>
              </button>
              {mobileMenuOpen && (
                <nav
                  className="absolute top-16 left-0 w-full bg-background border-b border-border shadow-md z-40"
                  aria-label="Mobile navigation"
                >
                  <ul className="flex flex-col gap-2 p-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block py-2 px-4 rounded text-sm text-muted-foreground hover:text-brand-orange transition-colors ${
                            pathname === link.href
                              ? 'font-bold text-brand-orange underline underline-offset-4'
                              : ''
                          }`}
                          aria-current={
                            pathname === link.href ? 'page' : undefined
                          }
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
