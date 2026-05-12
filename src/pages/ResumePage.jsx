// src/pages/ResumePage.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "../styles/PageStyles.css";

// Moving Stars with Scroll
function MovingStars() {
  const starsRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y = scrollRef.current;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />;
}

export default function ResumePage() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 820;

  return (
    <div
      style={{
        minHeight: "150vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        background: "black",
        position: "relative",
      }}
    >
      {/* 3D Background */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <MovingStars />
      </Canvas>

      {/* Title Outside */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingTop: "4rem",
          paddingLeft: isMobile ? "16px" : "0",
          paddingRight: isMobile ? "16px" : "0",
        }}
      >
        <h1
          style={{
            color: "#00ffff",
            textShadow: "0 0 10px #0ff",
            fontSize: isMobile ? "2rem" : "2.5rem",
          }}
        >
          Resume
        </h1>
      </div>

      {/* Resume Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "2rem auto",
          width: isMobile ? "calc(100% - 24px)" : "90%",
          maxWidth: "900px",
          padding: isMobile ? "1rem" : "2rem",
          background: "rgba(0, 255, 255, 0.05)",
          border: "2px solid #00ffff",
          borderRadius: "12px",
          boxShadow: "0 0 20px #00ffff55",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <img
          src="resume/Vineth_Joseph_Choudary_Resume-1.png"
          alt="Resume"
          style={{
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 0 0px #0ff",
            marginBottom: "1rem",
            display: "block",
          }}
        />
        <a
          href="resume/Vineth_Joseph_Choudary_Resume-1.pdf"
          download
          style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "#00ffff",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            marginBottom: "2rem",
            boxShadow: "0 0 10px #00ffff",
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}