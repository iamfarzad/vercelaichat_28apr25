'use client';

import { useId } from 'react';
import { CombinedOrb } from './hero-section/combined-orb';
import { cn } from '@/lib/utils';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (initialMessage?: string) => void;
}

export function HeroSection({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeroSectionProps) {
  const inputId = useId();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Animated grid pattern background fills the hero section, no mask, no skew, subtle opacity */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full"
      />

      {/* Centered content container, no extra background or shadow */}
      <div className="relative max-w-3xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mt-8 mb-4 text-gradient text-center">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl mb-8 text-center">
          {description}
        </p>

        <CombinedOrb className="w-24 h-24 mx-auto mb-10" />

        <div className="flex items-center justify-center max-w-md w-full rounded-full px-4 py-2 mb-6">
          <input
            id={inputId}
            className="flex-1 bg-transparent outline-none text-base placeholder-zinc-400 border-none shadow-none"
            placeholder="Ask me anything about AI consulting"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onButtonClick((e.target as HTMLInputElement).value);
              }
            }}
            aria-label="Ask a question"
          />
          <button
            type="button"
            onClick={() => {
              const inputEl = document.getElementById(
                inputId,
              ) as HTMLInputElement;
              onButtonClick(inputEl.value);
            }}
            className="ml-2 p-1 rounded-full text-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-xl h-8 w-8 flex items-center justify-center"
            aria-label="Send question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
