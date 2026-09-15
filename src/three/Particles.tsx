import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { clock } from '../lib/store';
import { keys } from './choreography';

const COUNT = 140;

const vert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uAlpha;
  uniform vec3 uCenter;
  uniform float uSpread;
  varying float vA;
  void main() {
    vec3 p = position;
    float t = uTime * 0.25 + aPhase;
    p.x += sin(t * 1.3 + aPhase) * 0.25;
    p.y += cos(t * 0.9 + aPhase * 2.0) * 0.25;
    p.z += sin(t * 0.7) * 0.15;
    p = uCenter + p * uSpread;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (18.0 / -mv.z);
    vA = uAlpha * (0.35 + 0.65 * abs(sin(t * 2.0 + aPhase)));
  }
`;
const frag = /* glsl */ `
  varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float star = smoothstep(0.5, 0.0, d);
    // formato de brilho de 4 pontas
    float cross = smoothstep(0.08, 0.0, abs(c.x)) + smoothstep(0.08, 0.0, abs(c.y));
    float a = (star * 0.7 + cross * 0.5 * smoothstep(0.5, 0.1, d)) * vA;
    gl_FragColor = vec4(0.72, 0.45, 0.98, a * 0.8);
  }
`;

/** Partículas ✦ que o cristal "expele" nas seções de IA. */
export function Particles() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAlpha: { value: 0 },
          uCenter: { value: new THREE.Vector3() },
          uSpread: { value: 1 },
        },
      }),
    [],
  );
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.cbrt(Math.random()) * 2.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(ph) * 0.6;
      size[i] = 4 + Math.random() * 8;
      phase[i] = Math.random() * Math.PI * 2;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    return g;
  }, []);
  const alpha = useRef(0);
  const center = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const k = keys[clock.active];
    const d = Math.min(dt, 0.1);
    const l = 1 - Math.exp(-2 * d);
    alpha.current += (k.particles - alpha.current) * l;
    center.lerp(new THREE.Vector3(...k.crystal.pos), l);
    mat.uniforms.uTime.value = clock.time;
    mat.uniforms.uAlpha.value = alpha.current;
    mat.uniforms.uCenter.value.copy(center);
    mat.uniforms.uSpread.value = 0.9 + k.crystal.scale * 0.9;
  });

  return <points geometry={geo} material={mat} />;
}
