// components/ui/shine-border.tsx
import React from 'react';

export function ShineBorder({
  children,
  shineColor = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
  className = '',
}: {
  children: React.ReactNode;
  shineColor?: string[];
  className?: string;
}) {
  // Minimal animated border effect (replace with your effect as needed)
  return (
    <div
      className={`relative p-[2px] rounded-2xl bg-gradient-to-r from-[${shineColor[0]}] via-[${shineColor[1]}] to-[${shineColor[2]}] animate-shine ${className}`}
      style={{}}
      aria-hidden="true"
    >
      <div className="rounded-2xl bg-black">{children}</div>
    </div>
  );
}
