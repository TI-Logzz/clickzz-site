import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { clock } from '../lib/store';
import { keys } from './choreography';

/**
 * "Wash": um quad de tela cheia no fundo da cena com um shader de luz roxa em
 * movimento (noise + anel de transição), no espírito das transições da pear.no.
 * Fica atrás de tudo; o DOM claro é desenhado por cima com transparência.
 */
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uWash;
  uniform float uRing;   // 0..1 progresso do anel de transição
  uniform vec2  uAspect;
  uniform vec2  uPointer;

  // simplex-ish noise (hash based, barato)
  vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)), dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
    float a = hash3(i).x, b = hash3(i+vec2(1,0)).x, c = hash3(i+vec2(0,1)).x, d = hash3(i+vec2(1,1)).x;
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * uAspect;
    float t = uTime * 0.06;
    float n = fbm(p * 1.4 + vec2(t, -t * 0.7));
    float n2 = fbm(p * 2.8 - vec2(t * 0.5, t));
    // duas luzes: uma segue o ponteiro suavemente, outra flutua
    vec2 l1 = vec2(0.35 + uPointer.x * 0.15, 0.15 + uPointer.y * 0.1) * uAspect;
    vec2 l2 = vec2(-0.4 + sin(t * 3.0) * 0.1, -0.25 + cos(t * 2.0) * 0.1) * uAspect;
    float g1 = exp(-dot(p - l1, p - l1) * 1.4);
    float g2 = exp(-dot(p - l2, p - l2) * 1.1);
    float glow = (g1 * 0.9 + g2 * 0.7) * (0.6 + 0.4 * n);
    // anel de transição
    float r = length(p);
    float ring = smoothstep(uRing * 2.6 - 0.35, uRing * 2.6, r) * (1.0 - smoothstep(uRing * 2.6, uRing * 2.6 + 0.35, r));
    ring *= step(0.001, uRing) * step(uRing, 0.999);
    vec3 violet = vec3(0.78, 0.62, 1.0);
    vec3 lilac  = vec3(0.92, 0.86, 1.0);
    vec3 col = mix(lilac, violet, n2) * glow + violet * ring * 0.9;
    float a = clamp((glow * 0.55 + ring * 0.6) * uWash, 0.0, 0.85);
    gl_FragColor = vec4(col, a);
  }
`;

export function Wash() {
  const { size } = useThree();
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uWash: { value: 0.5 },
          uRing: { value: 0 },
          uAspect: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: new THREE.Vector2() },
        },
      }),
    [],
  );
  const wash = useRef(0.5);
  const lastActive = useRef(clock.active);
  const ring = useRef(1);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    const k = keys[clock.active];
    wash.current += (k.wash - wash.current) * (1 - Math.exp(-1.5 * d));
    if (lastActive.current !== clock.active) {
      // troca de seção: dispara um anel
      lastActive.current = clock.active;
      ring.current = 0;
    }
    if (ring.current < 1) ring.current = Math.min(1, ring.current + d * 0.55);
    mat.uniforms.uTime.value = clock.time;
    mat.uniforms.uWash.value = wash.current;
    mat.uniforms.uRing.value = ring.current;
    mat.uniforms.uAspect.value.set(size.width / size.height, 1);
    mat.uniforms.uPointer.value.set(clock.pointerSmooth.x, clock.pointerSmooth.y);
  });

  return (
    <mesh material={mat} renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
