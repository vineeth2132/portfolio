import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Scene() {
  const cube = useRef();

  useFrame(() => {
    if (cube.current) {
      cube.current.rotation.y += 0.01;
      cube.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={cube} position={[0, 0, 0]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
