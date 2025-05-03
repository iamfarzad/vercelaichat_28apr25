'use client';

import { ModernButton } from '@/components/ui/modern-button';
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
            <ModernButton
              variant="primary"
              className="px-8 py-6 text-lg h-auto"
            >
              See Service Plans
            </ModernButton>
          </Link>

          <ModernButton
            variant="secondary"
            className="px-8 py-6 text-lg h-auto"
            onClick={onButtonClick}
          >
            Book Free Call
          </ModernButton>
        </div>
      </div>
    </section>
  );
}
