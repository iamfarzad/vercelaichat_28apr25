'use client';

import { motion } from 'framer-motion';

export function PulsingDot({ className }: { className?: string }) {
  return (
    <motion.div
      className={`size-2 rounded-full ${className}`}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
