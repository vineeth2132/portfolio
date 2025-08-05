// src/pages/ProjectDetailsPage.jsx
import React, { useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import projectsData from "../data/projectsData";
import "../styles/PageStyles.css";

// Scroll-based starfield rotation
function MovingStars() {
  const starsRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true }); // Added
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

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) return <p>Project not found</p>;

  return (
    <div style={{ height: "150vh", width: "100vw", background: "black" }}>
      {/* 3D Background */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={1.5} />
        <MovingStars />
      </Canvas>

      {/* Holographic Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          top: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0, 255, 255, 0.05)",
            border: "2px solid #00ffff",
            borderRadius: "12px",
            padding: "2rem",
            color: "#fff",
            textAlign: "center",
            width: "800px",
            boxShadow: "0 0 20px #00ffff55",
          }}
        >
          <h1 style={{ color: "#00ffff", textShadow: "0 0 10px #0ff" }}>
            {project.title}
          </h1>
          <p style={{ color: "#ccc", lineHeight: "1.6" }}>{project.description}</p>

          <h2 style={{ color: "#0ff", marginTop: "1.5rem" }}>Tech Stack:</h2>
          <ul style={{ listStyle: "none", padding: 0, color: "#ccc" }}>
            {project.techStack.map((tech, idx) => (
              <li key={idx} style={{ margin: "0.3rem 0" }}>
                {tech}
              </li>
            ))}
          </ul>

          <Link to="/projects" className="back-btn">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}
