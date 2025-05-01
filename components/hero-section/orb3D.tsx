'use client';

// Polished animated border effect
import { ShineBorder } from '@/components/ui/shine-border';
import { Vector2 } from 'three';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three-stdlib';

// Brand orange palette (from Tailwind/globals.css)
const ORANGE_MAIN = '#fe5a1d';
const ORANGE_ACCENT = '#ff7a1a';
const ORANGE_SOFT = '#ffd1ad';
const ORANGE_RING = '#ffb26b';
const ORANGE_GLOW = '#fff3e0';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function PulsingRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsed = clock.getElapsedTime();
      ref.current.rotation.x = tilt[0];
      ref.current.rotation.y = tilt[1] + elapsed * speed;
      ref.current.rotation.z = tilt[2];
      const scale = 1 + 0.15 * Math.sin(elapsed * 3 * speed * 10);
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.045, 16, 128]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.45}
        emissive={color}
        emissiveIntensity={0.9}
      />
    </mesh>
  );
}

// Simplex noise implementation for smooth noise
class SimplexNoise {
  grad3: number[][];
  perm: number[];
  constructor() {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = Math.floor(Math.random() * 256);
    }
  }
  dot(g: number[], x: number, y: number, z: number) {
    return g[0] * x + g[1] * y + g[2] * z;
  }
  noise(xin: number, yin: number, zin: number) {
    const F3 = 1 / 3;
    const G3 = 1 / 6;
    let n0: number;
    let n1: number;
    let n2: number;
    let n3: number;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1: number;
    let j1: number;
    let k1: number;
    let i2: number;
    let j2: number;
    let k2: number;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 =
      this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 =
      this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
  }
}

function RotatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { gl, scene, camera } = useThree();

  // Cube render target for environment mapping
  const cubeRenderTarget = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      }),
    [],
  );
  const cubeCamera = useMemo(
    () => new THREE.CubeCamera(0.1, 1000, cubeRenderTarget),
    [cubeRenderTarget],
  );

  // Add cubeCamera to scene once
  useEffect(() => {
    scene.add(cubeCamera);
  }, [scene, cubeCamera]);

  // Particle texture
  const [particleTexture] = useState(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.clearRect(0, 0, size, size);
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,200,120,0.8)');
    gradient.addColorStop(1, 'rgba(255,200,120,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  });

  // Particle count increased to 800 for denser effect
  const particleCount = 800;

  // Generate particle positions biased toward spherical shell surface
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      // Spherical coordinates with bias toward surface (radius close to 2.2)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      // Radius biased towards 2.0 to 2.3 range, more near 2.2
      const r = 2.0 + 0.3 * Math.pow(Math.random(), 3);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }
    return new Float32Array(positions);
  }, [particleCount]);

  // Velocities or offsets for noise-driven movement
  const offsetsRef = useRef<Float32Array | null>(null);
  if (!offsetsRef.current) {
    const offsets = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      offsets[i * 3] = Math.random() * 1000;
      offsets[i * 3 + 1] = Math.random() * 1000;
      offsets[i * 3 + 2] = Math.random() * 1000;
    }
    offsetsRef.current = offsets;
  }

  // Noise instance for smooth movement
  const noise = useMemo(() => new SimplexNoise(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Update cube camera for environment mapping
    if (meshRef.current) {
      meshRef.current.visible = false;
      cubeCamera.update(gl, scene);
      meshRef.current.visible = true;

      // Rotate core orb
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = t * 0.09;

      // Pulsate core scale slightly
      const pulsate = 1 + 0.05 * Math.sin(t * 5);
      meshRef.current.scale.set(pulsate, pulsate, pulsate);
    }

    // Animate glow sphere scale and rotation
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.12;
      const glowScale = 1.05 + 0.1 * Math.sin(t * 7);
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }

    // Animate particles with noise-driven offsets
    if (particlesRef.current && offsetsRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        // Original base position
        const baseX = particlePositions[ix];
        const baseY = particlePositions[ix + 1];
        const baseZ = particlePositions[ix + 2];

        // Compute noise-based offsets for smooth flowing movement
        const offsetX = noise.noise(
          offsetsRef.current[ix] + t * 0.1,
          offsetsRef.current[ix + 1],
          offsetsRef.current[ix + 2],
        );
        const offsetY = noise.noise(
          offsetsRef.current[ix],
          offsetsRef.current[ix + 1] + t * 0.1,
          offsetsRef.current[ix + 2],
        );
        const offsetZ = noise.noise(
          offsetsRef.current[ix],
          offsetsRef.current[ix + 1],
          offsetsRef.current[ix + 2] + t * 0.1,
        );

        // Small amplitude offset for ethereal movement
        const amplitude = 0.15;
        positions[ix] = baseX + offsetX * amplitude;
        positions[ix + 1] = baseY + offsetY * amplitude;
        positions[ix + 2] = baseZ + offsetZ * amplitude;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Slowly rotate the entire particle system
      particlesRef.current.rotation.y = t * 0.09;
    }
  });

  // Pulsing rings parameters
  const rings = [
    {
      radius: 1.7,
      color: ORANGE_RING,
      speed: 0.18,
      tilt: [0.6, 0, 0] as [number, number, number],
    },
    {
      radius: 1.9,
      color: ORANGE_ACCENT,
      speed: -0.12,
      tilt: [0, 0.7, 0.3] as [number, number, number],
    },
    {
      radius: 2.1,
      color: ORANGE_SOFT,
      speed: 0.09,
      tilt: [0.3, 0.2, 0.8] as [number, number, number],
    },
  ];

  return (
    <>
      {/* Core orb with glass/plasma effect */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.4, 96, 96]} />
        <meshPhysicalMaterial
          color={ORANGE_ACCENT}
          envMap={cubeRenderTarget.texture}
          transmission={0.9}
          thickness={2.5}
          roughness={0}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          reflectivity={0.7}
          transparent
          opacity={0.85}
          attenuationColor={new THREE.Color(ORANGE_MAIN)}
          attenuationDistance={0.5}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshPhysicalMaterial
          color={ORANGE_SOFT}
          emissive={ORANGE_GLOW}
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.8}
          clearcoat={0.9}
          clearcoatRoughness={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Pulsing rings */}
      {rings.map((r) => (
        <PulsingRing key={r.radius} {...r} />
      ))}

      {/* Noise-driven animated floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={ORANGE_SOFT}
          size={0.3}
          sizeAttenuation
          transparent
          opacity={0.6}
          map={particleTexture}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function Effects() {
  const composer = useRef<any>();
  const { scene, gl, size, camera } = useThree();

  useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composer.current.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attach="passes" scene={scene} camera={camera} />
      <unrealBloomPass attach="passes" args={[new Vector2(size.width, size.height), 1.2, 0.6, 0]} />
    </effectComposer>
  );
}

export function Orb3D({ className = '' }: { className?: string }) {
  // Responsive, double-size orb (48rem, 384px) and adapts to parent
  return (
    <div
      className={`relative w-[48rem] h-[48rem] max-w-full max-h-[80vh] mx-auto flex items-center justify-center ${className}`}
      data-orb-bg
    >
      <ShineBorder
        className="absolute inset-0 pointer-events-none z-20"
        shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
      >
        <Canvas
          camera={{ position: [0, 0, 8] }}
          className="w-full h-full bg-transparent"
          gl={{
            antialias: true,
            alpha: true,
            toneMappingExposure: 1.0,
          }}
        >
          <Environment preset="studio" background={false} />
          <ambientLight intensity={0.45} color={ORANGE_SOFT} />
          <pointLight
            position={[8, 8, 8]}
            intensity={1.2}
            color={ORANGE_MAIN}
          />
          <RotatingOrb />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
          <Effects />
        </Canvas>
      </ShineBorder>
      {/* Adaptive overlay for light/dark mode */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
