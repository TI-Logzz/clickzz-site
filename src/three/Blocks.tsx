import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { aspectX } from './Crystal';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { clock } from '../lib/store';
import { keys, type SceneKey } from './choreography';

const COUNT = 22;

/** Blocos de construção: cards finos e arredondados que representam seções e etapas. */
export function Blocks() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const { viewport } = useThree();
  const geo = useMemo(() => new RoundedBoxGeometry(1.1, 0.68, 0.12, 4, 0.1), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        phase: (i / COUNT) * Math.PI * 2,
        r: 0.6 + Math.random() * 0.4,
        speed: 0.15 + Math.random() * 0.2,
        tilt: (Math.random() - 0.5) * 0.6,
        tone: Math.random(),
      })),
    [],
  );
  // posição atual (interpolada) e alvo de cada bloco
  const cur = useMemo(() => Array.from({ length: COUNT }, () => new THREE.Vector3()), []);
  const rotCur = useMemo(() => Array.from({ length: COUNT }, () => new THREE.Euler()), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const scaleCur = useRef(1);
  const colors = useMemo(() => {
    const a = new Float32Array(COUNT * 3);
    const white = new THREE.Color('#ffffff');
    const lilac = new THREE.Color('#e4d5f5');
    const violet = new THREE.Color('#aa48ff');
    for (let i = 0; i < COUNT; i++) {
      const t = seeds[i].tone;
      const c = t < 0.6 ? white : t < 0.88 ? lilac : violet;
      a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b;
    }
    return a;
  }, [seeds]);

  const layoutTarget = (k: SceneKey['blocks'], i: number, t: number, out: THREE.Vector3, rot: THREE.Euler) => {
    const s = seeds[i];
    const [cx0, cy, cz] = k.center;
    const cx = aspectX(cx0, viewport.aspect);
    const narrowSpread = viewport.aspect < 1.6 ? Math.max(0.5, viewport.aspect / 1.6) : 1;
    const n = COUNT;
    switch (k.layout) {
      case 'orbit': {
        const a = s.phase + t * s.speed;
        const rr = k.spread * narrowSpread * s.r;
        out.set(cx + Math.cos(a) * rr, cy + Math.sin(a * 0.7 + s.phase) * rr * 0.55, cz + Math.sin(a) * rr * 0.6);
        rot.set(s.tilt * 0.5, a * 0.6, Math.sin(a) * 0.2);
        break;
      }
      case 'grid': {
        const cols = 5;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const w = k.spread * narrowSpread * 0.55;
        out.set(cx + (col - (cols - 1) / 2) * w, cy + ((n / cols - 1) / 2 - row) * w * 0.7, cz + Math.sin(t * 0.8 + i) * 0.08);
        rot.set(-0.15, 0.25, 0);
        break;
      }
      case 'stack': {
        out.set(cx + Math.sin(i * 1.7) * 0.05, cy + (i - n / 2) * 0.16, cz - i * 0.02);
        rot.set(-0.35, 0.35, 0);
        break;
      }
      case 'column': {
        const col = i % 2;
        const row = Math.floor(i / 2);
        out.set(cx + (col - 0.5) * 1.3, cy + ((n / 2 - 1) / 2 - row) * 0.42, cz + Math.sin(t * 0.6 + i) * 0.06);
        rot.set(-0.1, 0.4, 0);
        break;
      }
      case 'ring': {
        const a = s.phase + t * 0.12;
        out.set(cx + Math.cos(a) * k.spread * narrowSpread, cy + Math.sin(a) * k.spread * narrowSpread * 0.42, cz + Math.sin(a) * 0.8);
        rot.set(0.2, -a + Math.PI / 2, 0);
        break;
      }
      default:
        out.set(cx, cy, cz - 10);
        rot.set(0, 0, 0);
    }
  };

  useFrame((_, dt) => {
    const k = keys[clock.active].blocks;
    const d = Math.min(dt, 0.1);
    const lerp = 1 - Math.exp(-2.6 * d);
    const narrow = viewport.aspect < 1.6 ? Math.max(0.5, viewport.aspect / 1.6) : 1;
    scaleCur.current += (k.scale * narrow - scaleCur.current) * lerp;
    const vel = THREE.MathUtils.clamp(clock.velocity * 0.002, -1, 1);
    for (let i = 0; i < COUNT; i++) {
      layoutTarget(k, i, clock.time, target, dummy.rotation);
      cur[i].lerp(target, lerp);
      // velocidade do scroll entorta levemente o cluster
      cur[i].y -= vel * 0.02 * (i % 3);
      rotCur[i].x += (dummy.rotation.x - rotCur[i].x) * lerp;
      rotCur[i].y += (dummy.rotation.y - rotCur[i].y) * lerp;
      rotCur[i].z += (dummy.rotation.z + vel * 0.05 - rotCur[i].z) * lerp;
      dummy.position.copy(cur[i]);
      dummy.rotation.copy(rotCur[i]);
      dummy.scale.setScalar(scaleCur.current * (k.layout === 'hidden' ? 0.001 : 1));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, COUNT]} castShadow receiveShadow>
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
      <meshPhysicalMaterial
        color="#efe6fb"
        emissive="#d9c8f5"
        emissiveIntensity={0.28}
        roughness={0.3}
        metalness={0}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        envMapIntensity={1.8}
        sheen={0.5}
        sheenColor="#e4d5f5"
      />
    </instancedMesh>
  );
}
