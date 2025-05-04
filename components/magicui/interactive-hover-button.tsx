'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface InteractiveHoverButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function InteractiveHoverButton({
  href,
  children,
  className,
}: InteractiveHoverButtonProps) {
  return (
    <Link
      href={href}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute -inset-1 rounded-md bg-gradient-to-r from-transparent to-brand-orange/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
