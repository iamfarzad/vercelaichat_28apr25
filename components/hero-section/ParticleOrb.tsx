'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface ParticleOrbProps {
  className?: string;
}

export function ParticleOrb({ className = '' }: ParticleOrbProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { orbColor, particleColor } = useMemo(() => ({
    orbColor: theme === 'dark' ? '#ffffff50' : '#00000050',
    particleColor: theme === 'dark' ? '#ffffff80' : '#00000080',
  }), [theme]);

  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const degree = index * 30;
      const uniqueId = `particle-${degree}`;
      return (
        <motion.div
          key={uniqueId}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: particleColor,
            transition: 'background 0.3s ease',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: Math.cos(degree * (Math.PI / 180)) * 100,
            y: Math.sin(degree * (Math.PI / 180)) * 100,
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
            ease: 'easeInOut'
          }}
        />
      );
    });
  }, [particleColor]);

  return (
    <motion.div 
      className={`relative w-64 h-64 rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle at center, ${orbColor}, transparent)`,
        transition: 'background 0.3s ease'
      }}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut'
      }}
    >
      {particles}
    </motion.div>
  );
}
