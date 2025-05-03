'use client';

import Link from 'next/link';
import { ThemeToggle } from '../temp-next/components/theme-toggle';
import SearchBar from './search-bar';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
      <div className="container flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative">
            <span className="absolute w-2 h-2 rounded-full bg-brand-orange"></span>
          </span>
          <span className="font-bold text-xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] bg-clip-text text-transparent">
            F.B Consulting
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
