'use client';

import { motion } from 'framer-motion';

export function LineShadowText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}
