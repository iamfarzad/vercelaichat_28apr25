// Simple wavy vertex shader for orb surface
export const orbVertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = 0.08 * sin(8.0 * pos.y + uTime * 2.0) * cos(8.0 * pos.x + uTime * 1.5);
    pos += normal * wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Color cycling + interaction fragment shader for orb
export const orbFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uBoost;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    float t = 0.5 + 0.5 * sin(uTime * 0.25);
    vec3 color = mix(uColorA, uColorB, t);
    float glow = 0.15 + 0.25 * pow(1.0 - length(vUv - 0.5), 2.0);
    color += glow * uBoost;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Soft additive glow aura shader
export const glowVertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glowFragmentShader = `
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uBoost;
  void main() {
    float intensity = 0.3 + 0.4 * pow(1.0 - length(vPosition) / 1.5, 2.0);
    intensity *= 1.0 + 0.7 * uBoost;
    gl_FragColor = vec4(1.0, 0.7, 0.2, intensity * 0.5);
  }
`;
