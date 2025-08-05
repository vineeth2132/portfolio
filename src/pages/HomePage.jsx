// src/pages/HomePage.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "../styles/PageStyles.css";

// Starfield with scroll rotation
function MovingStars() {
  const starsRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y = scrollRef.current;
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />;
}

export default function HomePage() {
  return (
    <div style={{ minHeight: "150vh", width: "100vw", background: "black" }}>
      <Canvas
        style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={1.5} />
        <MovingStars />
      </Canvas>

      {/* Floating Content */}
      <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="home-intro">
          <div className="home-text">
            <h1>Hello, I'm Vineeth</h1>
            <p>
              I am a passionate Robotics Engineer with a deep focus on autonomous navigation, intelligent control systems, and robotic design. With a strong foundation in mechanical systems and embedded programming, I specialize in building smart, efficient, and scalable robotic solutions that address complex real-world challenges.
            </p>
            <p>
              My work blends mechanical design, AI-based decision-making, and software-hardware integration to create robots capable of navigating and interacting autonomously with dynamic environments. Whether it's designing mobile robots, implementing SLAM and path planning, or integrating machine vision and deep learning into control systems, I thrive on turning innovative ideas into functional, deployable systems.

Driven by curiosity and continuous learning, I aim to contribute to the future of robotics in industries such as automation, healthcare, space, and sustainability. I believe in using robotics not just as a technological tool, but as a means to positively impact human life.
            </p>
          </div>
          <div className="home-image">
            <img src="/vineeth-pic.jpg" alt="Vineeth" />
          </div>
        </div>

        {/* Education Section */}
        <section style={{ marginTop: "3rem", textAlign: "left" }}>
          <h2 style={{ color: "#0ff", textShadow: "0 0 10px #0ff" }}>Education</h2>
          <p>
            B.Tech in Mechatronics Engineering Specialization in Robotics, GPA - 2,1 <br />
            SRM Institute of Science and Technology (2020 - 2024),Chennai,India.  
           
          </p>
        </section>
      </div>
    </div>
  );
}
