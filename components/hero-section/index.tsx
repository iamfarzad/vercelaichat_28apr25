'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleOrb } from './ParticleOrb';
import { AskBar } from './ask-bar';
import { ModernButton } from '@/components/ui/modern-button';

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
    <div className="w-full max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center bg-background transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-muted/50 border border-border text-xs font-medium dark:bg-muted/20 dark:border-border/50">
          <span className="w-2 h-2 rounded-full bg-brand-orange dark:bg-brand-orange/90" />
          <span className="text-foreground dark:text-foreground/90">
            AI-Powered Wellness
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground dark:from-foreground/90 dark:to-muted-foreground/80 bg-clip-text text-transparent">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground/90 max-w-2xl mx-auto mb-8">
          {description}
        </p>

        <div className="flex flex-col items-center gap-6">
          <ModernButton onClick={() => onButtonClick()} variant="primary">
            {buttonText}
          </ModernButton>
        </div>
      </motion.div>

      <div className="relative w-full mt-12 mb-8">
        <ParticleOrb className="mx-auto" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <AskBar onSend={handleAskSubmit} />
        </div>
      </div>
    </div>
  );
}
