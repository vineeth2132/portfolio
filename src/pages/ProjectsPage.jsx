// src/pages/ProjectsPage.jsx
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Stars } from "@react-three/drei";
import projectsData from "../data/projectsData";
import "../styles/PageStyles.css";

function ModelViewer({ modelPath }) {
  const { scene } = useGLTF(modelPath, true);
  return <primitive object={scene} scale={1.5} />;
}

function FallbackCube() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  );
}

function MovingStars() {
  const starsRef = useRef();
  const scrollRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => (scrollRef.current = window.scrollY * 0.0015);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useFrame(() => starsRef.current && (starsRef.current.rotation.y = scrollRef.current));
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />;
}

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "150vh", width: "100vw", background: "black" }}>
      <Canvas style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }} camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <MovingStars />
      </Canvas>

      <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="page-title">Projects</h1>

        <div className="projects-list">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="model-viewer" style={{ height: "250px", margin: "1rem 0" }}>
                {project.model ? (
                  <Canvas style={{ height: "100%" }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} />
                    <Stage environment="city" intensity={0.5}>
                      <ModelViewer modelPath={project.model} />
                    </Stage>
                    <OrbitControls enableZoom />
                  </Canvas>
                ) : project.video ? (
                  <video controls style={{ width: "100%", borderRadius: "8px" }}>
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <FallbackCube />
                )}
              </div>

              <Link to={`/projects/${project.id}`} className="back-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* <Link to="/" className="back-btn">← Back to Home</Link> */}
      </div>
    </div>
  );
}
