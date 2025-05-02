'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FloatingOrb() {
  return (
    <div className="orb-container">
      <div className="glow-circle"></div>
      <motion.div
        className="orb"
        animate={{
          y: ['0%', '-20%', '0%'],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      <div className="reflection"></div>
    </div>
  );
}
