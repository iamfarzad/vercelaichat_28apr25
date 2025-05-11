import React, { useRef, useEffect, useState } from 'react';

// Simple cn utility for joining class names
function cn(...args: (string | undefined | false | null)[]) {
  return args.filter(Boolean).join(' ');
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  glowColor: string;
  brightness: number;
  alpha: number;
  velocity: {
    x: number;
    y: number;
  };
  type: 'primary' | 'secondary' | 'accent'; // Particle type for styling
}

interface ParticleOrbProps {
  color?: string;
  size?: number;
  particleCount?: number;
  interactive?: boolean;
  className?: string;
  highQuality?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  accentColor?: string;
}

const ParticleOrb: React.FC<ParticleOrbProps> = ({
  color = 'var(--orb-point-color)',
  size = 160,
  particleCount = 300, // Reduced from 1000 to 300 for less density
  interactive = true,
  className = '',
  highQuality = true,
  theme = 'auto',
  accentColor = 'var(--orb-ring-color)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef<{
    x: number | null;
    y: number | null;
    isPressed: boolean;
  }>({
    x: null,
    y: null,
    isPressed: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const timeRef = useRef<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    if (theme === 'dark') {
      setIsDarkMode(true);
    } else if (theme === 'light') {
      setIsDarkMode(false);
    } else {
      // Auto detect
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);

      // Listen for changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Initialize particles
  const initParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const orbRadius = size / 2;

    // Get computed colors from CSS variables
    const getComputedColorValue = (colorVar: string) => {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(colorVar.replace('var(', '').replace(')', ''))
          .trim() || colorVar
      );
    };

    const primaryColor = getComputedColorValue(color);
    const secondaryColor = getComputedColorValue(accentColor);

    // Parse colors to RGB
    const parseColor = (colorStr: string) => {
      let r = 255;
      let g = 122;
      let b = 56; // Default

      if (colorStr.startsWith('#')) {
        const hex = colorStr.replace('#', '');
        if (hex.length === 3) {
          // Support #rgb
          r = Number.parseInt(hex[0] + hex[0], 16);
          g = Number.parseInt(hex[1] + hex[1], 16);
          b = Number.parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
          // Support #rrggbb
          r = Number.parseInt(hex.substring(0, 2), 16);
          g = Number.parseInt(hex.substring(2, 4), 16);
          b = Number.parseInt(hex.substring(4, 6), 16);
        }
      } else {
        const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          r = Number.parseInt(rgbMatch[1]);
          g = Number.parseInt(rgbMatch[2]);
          b = Number.parseInt(rgbMatch[3]);
        }
      }

      return { r, g, b };
    };

    const primaryRGB = parseColor(primaryColor);
    const secondaryRGB = parseColor(secondaryColor);

    // Create color with opacity
    const createColor = (
      rgb: { r: number; g: number; b: number },
      opacity: number,
      variation: number = 0,
    ) => {
      const r = Math.min(255, Math.max(0, rgb.r + variation));
      const g = Math.min(255, Math.max(0, rgb.g + variation));
      const b = Math.min(255, Math.max(0, rgb.b + variation));
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Modified distribution for more natural clustering
      const distanceFactor = Math.pow(Math.random(), 0.3); // Changed from 0.7 to create denser edge effect
      const distance = distanceFactor * orbRadius;

      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      // Much smaller particles with less variation
      const particleSize = Math.random() * 0.8 + 0.2; // Reduced size range

      const density = Math.random() * 30 + 1;
      const colorVariation = Math.random() * 40 - 20; // increased variation for contrast
      const brightness = Math.random() * 0.8 + 0.2; // wider brightness range

      // Higher base alpha for more visible particles
      const distanceRatio = distance / orbRadius;
      const baseAlpha = 0.8 + (1 - distanceRatio) * 0.2;
      const alpha = baseAlpha * (Math.random() * 0.3 + 0.7);

      // Simplified particle types for more uniform appearance
      const type = Math.random() < 0.9 ? 'primary' : 'accent';

      // Enhanced glow colors
      const particleColor = createColor(
        type === 'primary' ? primaryRGB : secondaryRGB,
        alpha,
        colorVariation,
      );
      const glowColor = createColor(
        type === 'primary' ? primaryRGB : secondaryRGB,
        0.2, // Reduced glow opacity
        colorVariation,
      );

      particles.push({
        x,
        y,
        size: particleSize,
        baseX: x,
        baseY: y,
        density,
        color: particleColor,
        glowColor,
        brightness,
        alpha,
        velocity: {
          x: 0,
          y: 0,
        },
        type,
      });
    }

    particlesRef.current = particles;
  };

  // Draw a single particle with glow and highlight
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (highQuality) {
      // Enhanced glow effect
      const glow = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2, // Reduced glow radius
      );
      glow.addColorStop(0, particle.glowColor);
      glow.addColorStop(0.5, particle.glowColor.replace(/[\d.]+\)$/, '0.2)')); // Softer middle
      glow.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }

    // Smaller core with soft edge
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  };

  // Draw connection between particles with gradient
  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle,
    distance: number,
    maxDistance: number,
  ) => {
    // Only draw connections in very close proximity
    if (distance > maxDistance * 0.3) return; // Reduced connection distance

    const opacity = (1 - distance / maxDistance) * 0.15; // Reduced opacity

    if (highQuality) {
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, p1.color.replace(/[\d.]+\)$/, `${opacity})`));
      gradient.addColorStop(1, p2.color.replace(/[\d.]+\)$/, `${opacity})`));

      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(0.1, (1 - distance / maxDistance) * 0.5); // Thinner lines
    } else {
      ctx.strokeStyle = `${color}${Math.floor(opacity * 32)
        .toString(16)
        .padStart(2, '0')}`;
      ctx.lineWidth = 0.2;
    }

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  // Update particle positions and draw
  const updateParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    timestamp: number,
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const now = Date.now();

    // Draw connections first for better layering
    const maxConnectionDistance = highQuality ? 15 : 10; // Reduced from 35/25

    // Use default blend mode for clarity
    if (highQuality) {
      ctx.globalCompositeOperation = 'source-over'; // use default blend mode for clarity
    }

    // First pass: draw connections
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Adjust connection distance based on particle types
        let connectionThreshold = maxConnectionDistance;
        if (
          particlesRef.current[i].type === 'accent' &&
          particlesRef.current[j].type === 'accent'
        ) {
          connectionThreshold *= 1.4; // Connect accent particles from further away
        } else if (
          particlesRef.current[i].type === 'accent' ||
          particlesRef.current[j].type === 'accent'
        ) {
          connectionThreshold *= 1.2;
        }

        if (distance < connectionThreshold) {
          drawConnection(
            ctx,
            particlesRef.current[i],
            particlesRef.current[j],
            distance,
            connectionThreshold,
          );
        }
      }
    }

    // Reset composite operation for particle drawing
    if (highQuality) {
      ctx.globalCompositeOperation = 'source-over';
    }

    // Second pass: update and draw particles
    for (const particle of particlesRef.current) {
      const deltaTime = (now - (particle as any).lastUpdate || now) / 16;
      (particle as any).lastUpdate = now;

      // Natural movement - particles try to return to their base position
      const dx = particle.baseX - particle.x;
      const dy = particle.baseY - particle.y;

      // Different movement patterns based on particle type
      let movementSpeed = 0.02;
      let randomFactor = 0.3;

      if (particle.type === 'accent') {
        movementSpeed = 0.015; // Slower, more stable movement for accent particles
        randomFactor = 0.2;
      } else if (particle.type === 'secondary') {
        movementSpeed = 0.025;
        randomFactor = 0.35;
      }

      particle.x +=
        dx * movementSpeed * deltaTime + (Math.random() - 0.5) * randomFactor;
      particle.y +=
        dy * movementSpeed * deltaTime + (Math.random() - 0.5) * randomFactor;

      // Mouse interaction
      if (
        interactive &&
        mouseRef.current.x !== null &&
        mouseRef.current.y !== null
      ) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - particle.x;
        const dy = my - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Different interaction radius based on particle type
        let interactionRadius = mouseRef.current.isPressed ? 150 : 100;
        let forceFactor = mouseRef.current.isPressed ? 8 : 5;

        // Accent particles are less affected by mouse
        if (particle.type === 'accent') {
          forceFactor *= 0.7;
        }

        if (distance < interactionRadius) {
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          particle.x -=
            directionX *
            ((interactionRadius - distance) / interactionRadius) *
            forceFactor;
          particle.y -=
            directionY *
            ((interactionRadius - distance) / interactionRadius) *
            forceFactor;
        }
      }

      // Keep particles within bounds of the orb
      const distanceFromCenter = Math.sqrt(
        Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2),
      );

      // Different boundary behavior based on particle type
      let maxRadius = size / 2;

      // Accent particles can go slightly beyond the boundary
      if (particle.type === 'accent') {
        maxRadius *= 1.05;
      }

      if (distanceFromCenter > maxRadius) {
        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
        particle.x = centerX + Math.cos(angle) * maxRadius;
        particle.y = centerY + Math.sin(angle) * maxRadius;
      }

      drawParticle(ctx, particle);
    }
  };

  // Animation loop
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    timeRef.current = timestamp * 0.001;
    updateParticles(ctx, canvas.width, canvas.height, timestamp);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = container.width;
      canvasRef.current.height = container.height;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        initParticles(ctx, canvasRef.current.width, canvasRef.current.height);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size, particleCount, color, highQuality, accentColor, isDarkMode]);

  // Initialize canvas and start animation
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    canvasRef.current.width = container.width;
    canvasRef.current.height = container.height;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      initParticles(ctx, canvasRef.current.width, canvasRef.current.height);
      animationRef.current = requestAnimationFrame(animate);
      setIsLoaded(true);
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, particleCount, color, highQuality, accentColor, isDarkMode]);

  // Handle mouse movement and clicks
  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;
      mouseRef.current = {
        x: e.clientX - container.left,
        y: e.clientY - container.top,
        isPressed: mouseRef.current.isPressed,
      };
    };
    const handleMouseDown = () => {
      mouseRef.current = {
        ...mouseRef.current,
        isPressed: true,
      };
    };
    const handleMouseUp = () => {
      mouseRef.current = {
        ...mouseRef.current,
        isPressed: false,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null, isPressed: false };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          'mouseleave',
          handleMouseLeave,
        );
      }
    };
  }, [interactive]);

  // Enable high quality rendering
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx && highQuality) {
      ctx.imageSmoothingEnabled = true;
      // @ts-ignore
      ctx.imageSmoothingQuality = 'high';
    }
  }, [highQuality, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative orb-container rounded-3xl overflow-hidden transition-all duration-500', // Added 'relative'
        className,
      )}
      style={
        {
          '--orb-container-size': `${size * 2}px`,
          '--orb-size': `${size}px`,
          '--orb-color': color,
          '--orb-color-ring': `${color}20`,
          '--orb-color-glow': `${color}40`,
          width: `${size * 2}px`,
          height: `${size * 2}px`,
        } as React.CSSProperties
      }
    >
      <div className="orb-glow pointer-events-none" />
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 z-10 transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div className="orb-ring orb-ring-inner" />
      <div className="orb-ring orb-ring-outer" />
    </div>
  );
};

  <style jsx global>{`
    .orb-container {
      position: relative;
      overflow: hidden;
    }
    .orb-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 60%);
      transform: rotate(45deg);
      animation: orb-shimmer 2.5s infinite;
      pointer-events: none;
    }
    @keyframes orb-shimmer {
      0%   { transform: translate(-100%, -100%) rotate(45deg); }
      100% { transform: translate(100%, 100%)   rotate(45deg); }
    }
  `}</style>
export default ParticleOrb;
