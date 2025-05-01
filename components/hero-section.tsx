'use client';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (initialMessage?: string) => void;
}

import { Orb3D } from './hero-section/orb3D';

export function HeroSection({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeroSectionProps) {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mt-8 mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg sm:text-xl mb-8">
        {description}
      </p>
      <Orb3D className="w-24 h-24 mx-auto mb-10" />
      <div className="flex items-center justify-center max-w-md w-full bg-zinc-800 rounded-full px-4 py-2 shadow-inner text-white mb-6">
        <input
          id="askbar-input"
          className="flex-1 bg-transparent outline-none text-base placeholder-zinc-400"
          placeholder="Ask me anything about AI consulting"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onButtonClick((e.target as HTMLInputElement).value);
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            const inputEl = document.getElementById(
              'askbar-input',
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
  );
}
