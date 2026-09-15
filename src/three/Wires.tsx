import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { clock } from '../lib/store';
import { keys } from './choreography';

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const frag = /* glsl */ `
  uniform float uTime;
  uniform float uAlpha;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec2 vUv;
  void main() {
    float t = fract(vUv.x - uTime * 0.25);
    float pulse = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.08, 0.32, t));
    vec3 base = mix(uA, uB, vUv.x);
    vec3 col = mix(base, vec3(1.0, 0.93, 1.0), pulse * 0.85);
    float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float a = (0.85 + pulse * 0.15) * uAlpha * smoothstep(0.0, 0.3, edge);
    gl_FragColor = vec4(col, a);
  }
`;

/** Fios de conexão em tubo: gradiente roxo→lilás com pulsos de luz. */
export function Wires() {
  const group = useRef<THREE.Group>(null!);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uAlpha: { value: 0 },
          uA: { value: new THREE.Color('#7524cd') },
          uB: { value: new THREE.Color('#a855f7') },
        },
      }),
    [],
  );
  const curves = useMemo(() => {
    const list: THREE.TubeGeometry[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    for (let i = 0; i < 7; i++) {
      const pts = [
        new THREE.Vector3(rnd(-5, -1), rnd(-2.5, 2.5), rnd(-3, -1)),
        new THREE.Vector3(rnd(-1.5, 1.5), rnd(-1.5, 1.5), rnd(-2.5, 0)),
        new THREE.Vector3(rnd(1, 5), rnd(-2.5, 2.5), rnd(-3, -1)),
      ];
      list.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.042, 10, false));
    }
    return list;
  }, []);
  const alpha = useRef(0);

  useFrame((_, dt) => {
    const k = keys[clock.active];
    const d = Math.min(dt, 0.1);
    alpha.current += (k.wires - alpha.current) * (1 - Math.exp(-2 * d));
    mat.uniforms.uTime.value = clock.time;
    mat.uniforms.uAlpha.value = alpha.current;
    group.current.rotation.y = Math.sin(clock.time * 0.1) * 0.15 + clock.pointerSmooth.x * 0.05;
    group.current.rotation.x = clock.pointerSmooth.y * 0.04;
  });

  return (
    <group ref={group} position={[0, 0, -1]}>
      {curves.map((g, i) => (
        <mesh key={i} geometry={g} material={mat} />
      ))}
    </group>
  );
}
