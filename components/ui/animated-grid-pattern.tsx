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
  console.log('[AnimatedGridPattern] props', {
    numSquares,
    maxOpacity,
    duration,
    repeatDelay,
    className,
  });

  // Example implementation: renders animated squares in a grid
  const squares = Array.from({ length: numSquares }, (_, i) => (
    <div
      key={i}
      className="absolute bg-white/10 rounded"
      style={{
        left: `${(i % 5) * 20}%`,
        top: `${Math.floor(i / 5) * 20}%`,
        width: '18%',
        height: '18%',
        opacity: maxOpacity,
        animation: `fadeInOut ${duration}s ease-in-out ${i * repeatDelay}s infinite alternate`,
      }}
    />
  ));

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      {squares}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          100% { opacity: ${maxOpacity}; }
        }
      `}</style>
    </div>
  );
}
