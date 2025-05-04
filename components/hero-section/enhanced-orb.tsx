'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedOrbProps {
  className?: string;
}

export function EnhancedOrb({ className = '' }: EnhancedOrbProps) {
  return (
    <div className={`relative h-[200px] flex justify-center items-center ${className}`}>
      {/* Glow circle background */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-radial from-[oklch(var(--brand-orange)/0.2)] to-transparent opacity-20"></div>
      
      {/* Main orb */}
      <motion.div
        className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] relative z-10 shadow-lg"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] filter blur-[20px] opacity-40"></div>
      </motion.div>
      
      {/* Reflection */}
      <motion.div
        className="absolute bottom-2 w-[160px] h-[20px] bg-[oklch(var(--brand-orange))] filter blur-[10px] opacity-20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
