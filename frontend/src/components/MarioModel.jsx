import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function MarioModel() {
  const { scene } = useGLTF('/models/mario.glb');
  return <primitive object={scene} scale={1.5} rotation={[0, Math.PI, 0]} />;
}

export default function MarioScene() {
  return (
    <div className="canvas-wrapper">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <MarioModel />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}