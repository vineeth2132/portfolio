import React, { useState,useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as THREE from "three";
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

import FloatingName from "./components/FloatingName";
import NavBar from "./components/Navbar"; // Import the NavBar component
import styles from "./styles/LandingPage.module.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ExperiencePage from "./pages/ExperiencePage";
import AcademicsPage from "./pages/AcademicsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
// Neon Grid Floor (for landing background)
function NeonGridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshBasicMaterial wireframe color="#0ff" transparent opacity={0.0} />
    </mesh>
  );
}

// Holographic Navigation Buttons (only for landing page)
function HolographicFloor() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconStyle = {
    fontSize: "1.8rem",
    color: "#0ff",
    margin: "0 1rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const buttons = [
    { label: "Home", path: "/home" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
    { label: "Academics", path: "/academics" },
    { label: "Resume", path: "/resume" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <group position={[0, isMobile ? 4 : 3, 0]}>
        <Html center position={[0, isMobile ? -1 : 0, 0]} style={{ pointerEvents: "auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: isMobile ? "0.5rem" : "1.5rem",
              marginTop: isMobile ? "1rem" : "0", // Add vertical spacing for mobile
            }}
          >
            {buttons.map(({ label, path }) => (
              <div
                key={label}
                onClick={() => navigate(path)}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #0ff",
                  background: "rgba(0, 255, 255, 0.1)",
                  color: "#0ff",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textShadow: "0 0 8px #0ff",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 0 15px #0ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {label.toUpperCase()}
              </div>
            ))}
          </div>
        </Html>



      {/* SOCIAL ICONS + CONNECT BUTTON */}
      <Html center position={[0, -5, 0]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <div
            className="social-container"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <a href="https://linkedin.com/in/vineth-joseph-4a36931a6" target="_blank" rel="noopener noreferrer">
              <FaLinkedin style={iconStyle} />
            </a>
            <a href="https://www.instagram.com/___vineth___/?igsh=..." target="_blank" rel="noopener noreferrer">
              <FaInstagram style={iconStyle} />
            </a>
            <a href="https://www.facebook.com/vinethjoseph10..." target="_blank" rel="noopener noreferrer">
              <FaFacebook style={iconStyle} />
            </a>
            <a href="mailto:vineethjoseph12@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope style={iconStyle} />
            </a>
          </div>

          <a
            href="https://linkedin.com/in/vineth-joseph-4a36931a6"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-button"
            style={{
              padding: "0.7rem 2rem",
              border: "2px solid #0ff",
              background: "rgba(0, 255, 255, 0.1)",
              color: "#0ff",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textShadow: "0 0 10px #0ff",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 0 15px #0ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            LET’S CONNECT
          </a>
        </div>
      </Html>
    </group>
  );
}




// Typing HELLO animation for landing
function TypingHello({ visible }) {
  const fullText = "HELLO";
  const [text, setText] = useState("");

  React.useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <Html center>
      <h1
        style={{
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "3rem",
          textShadow: "0 0 10px #0ff",
          letterSpacing: "0.1em",
        }}
      >
        {text}
      </h1>
    </Html>
  );
}

// Camera zoom-in effect on landing
function CameraZoomOnScroll({ onComplete }) {
  const { camera } = useThree();
  const zoomedIn = React.useRef(false);
  const progress = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = (e) => {
      if (!zoomedIn.current && (e.deltaY > 0 || e.type === "touchmove")) {
        zoomedIn.current = true;
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  useFrame(() => {
    if (zoomedIn.current && progress.current < 1) {
      progress.current += 0.02;
      camera.position.lerpVectors(
        new THREE.Vector3(0, 160, 800),
        new THREE.Vector3(0, 2, 10),
        progress.current
      );
      camera.lookAt(0, 0, 0);
      if (progress.current >= 1 && onComplete) {
        onComplete();
      }
    }
  });

  return null;
}


// Landing page (main 3D intro)
function LandingPage({ skipIntro = false }) {
  const [zoomDone, setZoomDone] = useState(skipIntro);

  return (
  <div style={{ height: "100vh", width: "100vw", background: "black", position: "relative" }}>
    <Canvas
      camera={{
        position: skipIntro ? [0, 2, 10] : [0, 160, 800],
        fov: 50,
      }}
    >
      <ambientLight intensity={1.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <NeonGridFloor />
      {!skipIntro && <TypingHello visible={!zoomDone} />}
      {zoomDone && <HolographicFloor />}
      {!skipIntro && <CameraZoomOnScroll onComplete={() => setZoomDone(true)} />}
      <OrbitControls enableZoom />
    </Canvas>

    {/* Scroll Down Instruction */}
    {!skipIntro && !zoomDone && (
        <div className={styles["scroll-indicator"]}>
          <span className={styles["scroll-text"]}>Scroll down</span>
          {/* <div className={styles["chevron-down"]}></div> */}
        </div>



    )}
  </div>
);
}


// Main App
export default function App() {
  const location = useLocation();

  // Landing page without NavBar
  if (location.pathname === "/") {
    const searchParams = new URLSearchParams(location.search);
    const direct = searchParams.get("direct") === "true";
    return <LandingPage skipIntro={direct} />;
  }


  // Other pages with NavBar
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
