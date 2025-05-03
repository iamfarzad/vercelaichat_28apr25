'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CtaSectionProps {
  onButtonClick: () => void;
}

export function CtaSection({ onButtonClick }: CtaSectionProps) {
  return (
    <section id="cta" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold text-center mb-8">Ready to talk?</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/services">
            <Button
              variant="default"
              className="bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white px-8 py-6 text-lg h-auto"
            >
              See Service Plans
            </Button>
          </Link>

          <Button
            variant="outline"
            className="px-8 py-6 text-lg h-auto"
            onClick={onButtonClick}
          >
            Book Free Call
          </Button>
        </div>
      </div>
    </section>
  );
}
