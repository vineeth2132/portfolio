// src/components/FloatingName.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function FloatingName() {
  const textRef = useRef();

  // Animation (slight floating effect)
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.2;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={1}
      color="#00ffff"
      position={[0, -1, 0]} // Adjust vertical position under navbar
      outlineWidth={0.02}
      outlineColor="#0ff"
    >
      VJ
    </Text>
  );
}
