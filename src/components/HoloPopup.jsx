// src/components/HoloPopup.jsx
import React from 'react';
import { Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

export default function HoloPopup({ visible, content }) {
  const { scale } = useSpring({
    scale: visible ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <a.group scale={scale.to(s => [s, s, s])} position={[0, 2, 0]}>
      <Html center style={{ background: '#0ff3', padding: '1rem', borderRadius: '8px', color: 'white' }}>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </Html>
    </a.group>
  );
}
