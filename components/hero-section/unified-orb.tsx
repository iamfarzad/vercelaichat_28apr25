'use client';

import MinimalOrb from './ParticleOrb';

export default function OrbDemo() {
  return (
    <div className="relative h-[500px] size-full flex items-center justify-center bg-black/90">
      <MinimalOrb
        size={150}
        color="#FF7A38"
        interactive={true}
        className="z-10"
      />

      <div className="absolute bottom-8 inset-x-0 text-center text-white/70">
        <p>Move your cursor around to interact with the orb</p>
      </div>
    </div>
  );
}
