'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CombinedOrb } from './combined-orb';
import { AskBar } from './ask-bar';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (message?: string) => void;
}

export function HeroSection({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeroSectionProps) {
  const [askInput, setAskInput] = useState('');

  const handleAskSubmit = (value: string) => {
    onButtonClick(value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-muted/50 border border-border text-xs font-medium">
          <span className="size-2 rounded-full bg-brand-orange" />
          <span>AI-Powered Wellness</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {description}
        </p>

        <div className="flex flex-col items-center gap-6">
          <Button onClick={() => onButtonClick()} variant="modernPrimary">
            {buttonText}
          </Button>
        </div>
      </motion.div>
      <div className="w-full flex flex-col items-center mt-12 mb-8">
        <CombinedOrb />
        <div className="w-full max-w-md mt-8">
          <AskBar onSend={handleAskSubmit} />
        </div>
      </div>
    </div>
  );
}
