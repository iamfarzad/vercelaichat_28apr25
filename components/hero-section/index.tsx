'use client';

import { GlowingOrb } from './orb';
import { AskBar } from './ask-bar';
import { CTAButton } from './cta-button';

export interface HeroSectionProps {
  onSend: (value: string) => void;
}

export function HeroSection({ onSend }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6 sm:px-8 md:px-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto">
        AI consulting for founders and teams who can’t afford to guess
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto">
        Get clarity on what AI can do for your business with expert guidance.
      </p>
      <GlowingOrb className="w-24 h-24 my-4 mx-auto" />
      <div className="w-full flex justify-center">
        <AskBar onSend={onSend} />
      </div>
      <div className="w-full flex justify-center">
        <CTAButton className="mt-6" />
      </div>
    </section>
  );
}
