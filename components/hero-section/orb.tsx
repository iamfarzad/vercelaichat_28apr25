import React from 'react';
import './orb.css';
import { Orb3D } from './orb3D';

interface GlowingOrbProps {
  className?: string;
}

export function GlowingOrb({ className = '' }: GlowingOrbProps) {
  return (
    <div className={`relative w-24 h-24 ${className}`}>
      <Orb3D />
    </div>
  );
}
