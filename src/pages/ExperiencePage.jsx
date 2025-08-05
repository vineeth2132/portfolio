// src/pages/ExperiencePage.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "../styles/PageStyles.css";

// Starry background with scroll interaction
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
    if (starsRef.current) {
      starsRef.current.rotation.y = scrollRef.current;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />;
}

export default function ExperiencePage() {
  const professionalExperiences = [
    {
      role: "Intern",
      company: "Fronius India Pvt Ltd",
      date: "May 2024 – June 2024",
      details:
        "Acquired hands-on expertise in various welding processes such as SMAW, GMAW, and TIG.Conducted experimental analysis using a FANUC 6-axis robotic manipulator to study the effects of shielding gases (pure Argon, CO₂, and Argon-CO₂ blends in 80–20 and 98–2 ratios) on weld quality. Optimized welding parameters using advanced operational modes like CMT, PMC, PULSE, LSC, and standard modes for better process control.Also gained experience on robotic welding using various manipulators such as KUKA , KAWASAKI and YASKAWA (6-Axis manipulators) "
    },
    {
      role: "Automation Intern",
      company: "Apsis Solutions",
      date: "Feb 2024 – Mar 2024",
      details:
        "Developed an IoT-based Smart Factory system for real-time monitoring and optimization. Created a weather data acquisition platform using ESP32 with cloud integration. Designed and implemented a voice-controlled home automation system to enhance energy efficiency and remote usability."
    },
    {
      role: "Intern as Mechanical Engineer ",
      company: "Vaayusastra Aerospace",
      date: "Feb 2023 – May 2023",
      details:
        "Designed and fabricated an autonomous obstacle-avoidance vehicle.Also designed a Rocker Bogie mechanism using solidworks as a part of assignment and gained knowledge of its various advantages. Gained foundational knowledge in space rover design and mechanical systems."
    },
    {
      role: "Mechanical Design Intern",
      company: "Techanalogy",
      date: "May 2021 – June 2021",
      details:
        "Worked on conceptual electric cycle designs by repurposing existing bicycle chassis. Conceptualized and designed monowheel prototypes. Improved production efficiency and cost-effectiveness through optimized CAD modeling and simulation workflows."
    }
  ];

  const academicExperiences = [
    {
      role: "Powertrain Engineer",
      date: "2021 - 2023",
      details:
        "Worked in Infieon SuperMileage (a student team from SRM Institute of Science and Technology participating in the Shell Eco Marathon annually)."
    },
    {
      role: "Social Service Lead",
      date: "2023 - 2024",
      details:
        "Led social outreach initiatives at the Association of Mechatronics, SRM Institute of Science and Technology."
    },

  ];

    return (
      <div style={{ minHeight: "200vh", width: "100vw", background: "black" }}>
        {/* Starry 3D Background */}
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
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
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#00ffff", textShadow: "0 0 10px #0ff" }}>
            Experiences
          </h1>
        </div>
  

      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "2rem auto",
          maxWidth: "900px",
          padding: "2rem",
          background: "rgba(0, 255, 255, 0.05)",
          border: "2px solid #00ffff",
          borderRadius: "12px",
          boxShadow: "0 0 20px #00ffff55",
        }}
      >
        <h1 style={{ color: "#00ffff", textAlign: "center", fontSize: "2.5rem" }}>
          Professional Experience
        </h1>
        {professionalExperiences.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#fff", fontSize: "1.5rem" }}>{exp.role}</h2>
            <h3 style={{ color: "#0ff", margin: "0.3rem 0" }}>
              {exp.company && `${exp.company} `} <span style={{ color: "#aaa" }}>({exp.date})</span>
            </h3>
            <p style={{ color: "#ccc", lineHeight: "1.6", textAlign: "justify" }}>{exp.details}</p>
          </div>
        ))}

        <h1
          style={{
            color: "#00ffff",
            textAlign: "center",
            fontSize: "2.5rem",
            marginTop: "3rem"
          }}
        >
          Campus Engagements
        </h1>
        {academicExperiences.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#fff", fontSize: "1.5rem" }}>{exp.role}</h2>
            <h3 style={{ color: "#aaa", margin: "0.2rem 0" }}>{exp.date}</h3>
            <p style={{ color: "#ccc", lineHeight: "1.6", textAlign: "justify" }}>{exp.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
