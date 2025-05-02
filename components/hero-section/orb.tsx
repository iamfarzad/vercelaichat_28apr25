import React from 'react';
import './orb.css';

interface GlowingOrbProps {
  className?: string;
}

export function GlowingOrb({ className = '' }: GlowingOrbProps) {
  return (
    <div className={`relative w-24 h-24 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-300 animate-orb-core shadow-2xl" />
      <div className="absolute inset-0 rounded-full animate-orb-glow" />
      <div className="absolute inset-0 rounded-full animate-orb-wave" />
      <div className="absolute inset-0 rounded-full animate-orb-wave-delay" />
      <div className="absolute inset-0 rounded-full orb-flicker" />
      <div className="absolute inset-0 rounded-full orb-particles" />
      <div className="absolute inset-0 rounded-full orb-mesh" />
      <div className="relative w-full h-full" />
    </div>
  );
}
