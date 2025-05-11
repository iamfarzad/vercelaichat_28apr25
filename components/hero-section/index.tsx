'use client';

:start_line:3
-------
import { motion } from 'framer-motion';
import { ModernButton } from '@/components/ui/modern-button';
import { useChatStore } from '@/stores/chatStore'; // Import chat store
import MinimalOrb from './ParticleOrb';
import { AskBar } from './ask-bar';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (message?: string) => void;
  className?: string;
}

export function HeroSection({
  title,
  description,
  buttonText,
:start_line:25
-------
  onButtonClick,
  className = '',
}: HeroSectionProps) {
  const setInitialQuery = useChatStore((state) => state.setInitialQuery);

  const handleAskSubmit = (value: string) => {
    if (value.trim()) {
      setInitialQuery(value.trim());
    }
    // Optionally, call onButtonClick if it's meant for a different action now,
    // or remove it if the AskBar is the primary interaction.
    // For now, let's assume onButtonClick is for the separate button.
  };

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center ${className}`}
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
        )}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-muted/50 border border-border text-xs font-medium">
          <span className="size-2 rounded-full bg-brand-orange" />
          <span>F.B Consulting Online</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground dark:text-foreground">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {description}
        </p>
      </motion.div>

      <div className="w-full grid place-items-center mt-12 mb-8 relative z-10">
        <MinimalOrb />
        <div className="w-full max-w-md mt-8 flex flex-col items-center gap-4">
          <AskBar onSend={handleAskSubmit} />
          <ModernButton
            onClick={() => onButtonClick()}
            variant="primary"
            size="sm"
            className="bg-white text-black border border-border hover:bg-muted/80 hover:text-black"
          >
            {buttonText}
          </ModernButton>
        </div>
      </div>
    </div>
  );
}
