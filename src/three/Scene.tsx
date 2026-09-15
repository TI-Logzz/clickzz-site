import { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Crystal } from './Crystal';
import { Blocks } from './Blocks';
import { Wires } from './Wires';
import { Particles } from './Particles';
import { Wash } from './Wash';
import { clock, useUI } from '../lib/store';

function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (clock.pointerSmooth.x * 0.35 - camera.position.x) * 0.05;
    camera.position.y += (clock.pointerSmooth.y * 0.25 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Estúdio procedural: sem download de HDRI, sem dependência de rede. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#f6f3fb']} />
      <Lightformer intensity={2.2} rotation-x={Math.PI / 2} position={[0, 5, -6]} scale={[12, 6, 1]} color="#ffffff" />
      <Lightformer intensity={1.2} rotation-y={Math.PI / 2} position={[-6, 1, -1]} scale={[8, 3, 1]} color="#f1e8ff" />
      <Lightformer intensity={1.6} rotation-y={-Math.PI / 2} position={[6, 2, 0]} scale={[8, 4, 1]} color="#ffffff" />
      <Lightformer intensity={0.9} position={[0, -4, 4]} scale={[10, 2, 1]} color="#d4b3ff" />
      <Lightformer form="ring" intensity={1.4} position={[2, 3, 6]} scale={3} color="#c084fc" />
    </Environment>
  );
}

export function Scene() {
  const isTouch = useUI((s) => s.isTouch);
  return (
    <div className="gl-root" aria-hidden="true">
      <Canvas
        dpr={isTouch ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
        camera={{ fov: 32, position: [0, 0, 10], near: 0.1, far: 60 }}
        shadows={false}
        style={{ background: 'transparent' }}
        eventSource={undefined}
      >
        <Suspense fallback={null}>
          <Studio />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffffff" />
          <directionalLight position={[-5, -2, 3]} intensity={0.4} color="#d4b3ff" />
          <Wash />
          <Wires />
          <Blocks />
          <Particles />
          <Crystal />
          <ContactShadows position={[0, -3.4, 0]} opacity={0.18} scale={16} blur={2.6} far={6} color="#4c1d95" frames={1} />
          <CameraRig />
          <EffectComposer multisampling={4} enableNormalPass={false}>
            <Bloom luminanceThreshold={0.82} luminanceSmoothing={0.2} intensity={0.55} mipmapBlur radius={0.6} />
            <Noise opacity={0.045} blendFunction={BlendFunction.SOFT_LIGHT} />
            <Vignette offset={0.35} darkness={0.18} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
