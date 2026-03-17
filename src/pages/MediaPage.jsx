// src/pages/MediaPage.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Moving Stars component
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

export default function MediaPage() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 820;

  const sectionStyle = {
    padding: isMobile ? "60px 18px 30px" : "60px 50px",
    fontFamily: "Orbitron, sans-serif",
    color: "#e6ffff",
    position: "relative",
    zIndex: 10,
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: isMobile ? "2rem" : "2.5rem",
    marginBottom: "30px",
    textShadow: "0 0 10px #0ff",
    textAlign: isMobile ? "center" : "left",
    color: "#0ff",
    paddingTop: "80px",
  };

  const mediaGridStyle = {
    columnWidth: isMobile ? "260px" : "350px",
    columnGap: "20px",
  };

  const mediaItemStyle = {
    width: "100%",
    breakInside: "avoid",
    marginBottom: "20px",
    border: "1px solid #0ff",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "rgba(0, 40, 60, 0.4)",
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        position: "relative",
        color: "#0ff",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "transparent",
      }}
    >
      {/* Starry 3D Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MovingStars />
        </Canvas>
      </div>

      {/* --- Media Page Content --- */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Media Gallery</h2>

        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            lineHeight: "1.8em",
            marginBottom: "30px",
            color: "#dff",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          A collection of photos and videos from my projects, academic life, and professional journey.
        </p>

        <div style={mediaGridStyle}>
          <div style={mediaItemStyle}>
            <video width="100%" controls style={{ display: "block" }}>
              <source src="/videos/clim.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/casu1.jpeg" alt="" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/casu2.jpeg" alt="Casual 2" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/inter1.jpg" alt="Interior 1" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/infi1.jpg" alt="Inf 1" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/drone.jpg" alt="Drone" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/infi2.jpg" alt="Inf 2" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/infi3.jpg" alt="Inf 3" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <video width="100%" controls style={{ display: "block" }}>
              <source src="/videos/clim2.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={mediaItemStyle}>
            <video width="100%" controls style={{ display: "block" }}>
              <source
                src="/videos/Copy of automated millet identification and billing system.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/casu3.jpeg" alt="Casual 2" style={imageStyle} />
          </div>

          <div style={mediaItemStyle}>
            <img src="./images/bli1.jpg" alt="Casual 2" style={imageStyle} />
          </div>
        </div>
      </section>
    </div>
  );
}