import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Debug: log props to validate runtime values
export function AnimatedGridPattern({
  numSquares = 20,
  maxOpacity = 0.15,
  duration = 2,
  repeatDelay = 0.5,
  className = '',
}: {
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  className?: string;
}) {
  // Remove console.log in production code
  const id = useId();

  // Use Framer Motion for better animation performance
  const squares = Array.from({ length: numSquares }, (_, i) => (
    <motion.div
      key={`${id}-square-${
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        i
      }`}
      className="absolute bg-white/10 rounded"
      initial={{ opacity: 0 }}
      animate={{ opacity: maxOpacity }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
        delay: i * repeatDelay,
      }}
      style={{
        left: `${(i % 5) * 20}%`,
        top: `${Math.floor(i / 5) * 20}%`,
        width: '18%',
        height: '18%',
      }}
    />
  ));

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none',
        className,
      )}
    >
      {squares}
    </div>
  );
}
