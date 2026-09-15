import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { damp3, damp } from 'maath/easing';
import { clock } from '../lib/store';
import { keys } from './choreography';

/** A estrela ✦ de quatro pontas, extrudada com bevel para virar uma gema de vidro. */
function useStarGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const outer = 1;
    const inner = 0.3;
    const n = 4;
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.22,
      bevelSize: 0.14,
      bevelSegments: 8,
      curveSegments: 4,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** Posições da coreografia são definidas para 16:10; em telas estreitas o eixo x é comprimido para "canto" continuar canto. */
export function aspectX(x: number, aspect: number) {
  return aspect < 1.6 ? x * (aspect / 1.6) : x;
}

export function Crystal() {
  const geo = useStarGeometry();
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const state = useRef({ scale: 1, visible: 1, spin: 0.3 });
  const booted = useRef(false);

  useFrame((_, dt) => {
    const k = keys[clock.active];
    // quadros lentos (GPU fraca) não podem travar a coreografia: tolera até 100 ms por passo
    const d = Math.min(dt, 0.1);
    if (!booted.current) {
      // nasce já no lugar da seção ativa, sem viajar pelo centro da página
      booted.current = true;
      const portrait0 = viewport.aspect < 1;
      const p0 = portrait0 && k.crystal.posNarrow ? k.crystal.posNarrow : k.crystal.pos;
      group.current.position.set(portrait0 && k.crystal.posNarrow ? p0[0] : aspectX(p0[0], viewport.aspect), p0[1], p0[2]);
      state.current.scale = k.crystal.scale;
      state.current.visible = k.crystal.visible;
      state.current.spin = k.crystal.spin;
    }
    const portrait = viewport.aspect < 1;
    const p = portrait && k.crystal.posNarrow ? k.crystal.posNarrow : k.crystal.pos;
    const px = portrait && k.crystal.posNarrow ? p[0] : aspectX(p[0], viewport.aspect);
    tmp.set(px + clock.pointerSmooth.x * 0.25, p[1] + clock.pointerSmooth.y * 0.2, p[2]);
    damp3(group.current.position, tmp, 0.55, d);
    damp(state.current, 'scale', k.crystal.scale, 0.5, d);
    damp(state.current, 'visible', k.crystal.visible, 0.4, d);
    damp(state.current, 'spin', k.crystal.spin, 0.5, d);
    // em telas estreitas a gema encolhe junto com a largura visível, para nunca cobrir o texto
    const narrow = viewport.aspect < 1.6 ? Math.max(0.42, viewport.aspect / 1.6) : 1;
    const s = state.current.scale * (0.85 + 0.15 * state.current.visible) * narrow;
    group.current.scale.setScalar(s);
    // a gema oscila de frente para a câmera (nunca fica de lado) e reage à velocidade do scroll
    const v = THREE.MathUtils.clamp(clock.velocity * 0.0025, -0.6, 0.6);
    const t = clock.time * (0.5 + state.current.spin);
    inner.current.rotation.y = Math.sin(t * 0.6) * 0.5 + v * 0.4;
    inner.current.rotation.x = Math.sin(t * 0.45 + 1.2) * 0.2 + v * 0.2;
    inner.current.rotation.z = Math.cos(t * 0.3) * 0.15 + clock.time * 0.06;
    const mat = inner.current.material as THREE.Material;
    mat.opacity = state.current.visible;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.7} floatingRange={[-0.12, 0.12]}>
        <mesh ref={inner} geometry={geo}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.1}
            roughness={0.04}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.15}
            distortion={0.2}
            distortionScale={0.35}
            temporalDistortion={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
            color="#d9c4ff"
            attenuationColor="#9a5cf0"
            attenuationDistance={1.6}
            background={new THREE.Color('#f5f0fd')}
            samples={8}
            resolution={512}
            transparent
          />
        </mesh>
      </Float>
    </group>
  );
}
