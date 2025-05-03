'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative" aria-hidden="true">
                <span className="absolute w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              </span>
              <span className="font-bold text-xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] bg-clip-text text-transparent">
                F.B Consulting
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI should be simple, not complicated. We help you start the right
              way and master AI in daily work—employees and leaders alike.
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://www.farzadbayat.com"
                className="hover:text-foreground transition-colors"
              >
                www.farzadbayat.com
              </a>
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium text-base">Quick Links</h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded w-fit"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded w-fit"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded w-fit"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded w-fit"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium text-base">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates on AI
              consulting.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-background border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm w-full"
              />
              <button className="bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white px-4 py-2 rounded-r-md text-sm font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            © 2025 F.B Consulting. All rights reserved.
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
