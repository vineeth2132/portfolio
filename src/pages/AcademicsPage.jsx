// src/pages/AcademicsPage.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "../styles/PageStyles.css";

// Moving Stars with Scroll Effect
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

export default function AcademicsPage() {
  const certificates = [
    "/certificates/cert1.jpg",
    "/certificates/cert2.jpg",
    "/certificates/cert3.jpg",
    "/certificates/cert4.jpg",
    "/certificates/cert5.jpg",
    "/certificates/cert6.jpg",
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 820;

  return (
    <div
      style={{
        minHeight: "200vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        background: "black",
        position: "relative",
      }}
    >
      {/* Starry 3D Background */}
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

      {/* Page Title */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "5rem",
          paddingLeft: isMobile ? "16px" : "0",
          paddingRight: isMobile ? "16px" : "0",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#00ffff", textShadow: "0 0 10px #0ff" }}>
          Academic Achievements
        </h1>
      </div>

      {/* Holographic Content */}
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
          boxSizing: "border-box",
        }}
      >
        {/* Journal Publications */}
        <h2 style={{ color: "#0ff", marginTop: "1rem" }}>Journal Publications</h2>
        <p style={{ lineHeight: "1.5", color: "#ccc" }}>
          Madhumitha G, Vineth Joseph Mallavarapu, and Leela Ram Chelli, 2024,
          "Development of Automated Millet Identification and Billing System," ADCIS, 3.
        </p>

        {/* Patents */}
        <h2 style={{ color: "#0ff", marginTop: "1.5rem" }}>Patents</h2>
        <p style={{ lineHeight: "1.5", color: "#ccc" }}>
          - Title: A system for identifying and weighing loose items including Millets <br />
          Inventors: GNANASANKARAN MADHUMITHA, MALLAVARAPU VINETH JOSEPH, CHELLI LEELA RAM <br />
          Patent Application Number: 202541006107 <br />
          Publication Date: 31/01/2025 <br />
        </p>

        {/* Certificates */}
        <h2 style={{ color: "#0ff", marginTop: "2rem" }}>Certifications</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "2fr" : "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {certificates.map((cert, idx) => (
            <img
              key={idx}
              src={cert}
              alt={`Certificate ${idx + 1}`}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 0 0px #00ffff",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

