'use client';
import { useRef, useEffect } from 'react';

export default function OrbWrapper({
  children,
}: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      el?.style.setProperty('--rotateX', `${-y * 10}deg`);
      el?.style.setProperty('--rotateY', `${x * 10}deg`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} className="orb-parallax">
      {children}
    </div>
  );
}
