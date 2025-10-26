// src/pages/LandingPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TypeAnimation } from "react-type-animation";
import { Folder, BookOpen, X, Code, Zap, Cpu, Compass } from "lucide-react"; // Added new icons for domains
import NavBar from "./components/Navbar";

// --- SAMPLE PROJECT DATA (UNCHANGED) ---
const projectData = [
  {
    id: 1,
    title: "Automated Millet identification and Billing System",
    category: "Control",
    description: "Developed an automated millet classification system that uses deep learning for accurate millet variety identification",
    image: "./images/millet.jpg",
    tags: ["Deep learning", "Pytorch", "Computer Vision", "Algorithm Development", "Solidworks", "Arduino", "RapberryPi"],
    details: `Developed an automated millet classification system that uses deep learning for accurate millet variety identification via an upper camera with an accuracy of 85%, coupled with load cells for weight estimation.This project is also featured with automated billing systems basically automates the process of purchasing loose groceries such as millets,Atta,Dal and so on.`,
  },
  {
    id: 2,
    title: "Automonous Mobile Robot usign SLAM Algorithm",
    category: "Software Simulation",
    description: "Designed and developed an autonomous mobile robot leveraging ROS 2 Jazzy for navigation and control.",
    image: "/images/projects/f1_telemetry.jpg",
    tags: ["Python", "ROS", "Solidworks", "SLAM", "NLP"],
    details: `Implemented SLAM (Simultaneous Localization and Mapping) algorithms to enable real-time mapping and autonomous path planning. Additionally, integrated a LLaMA-based Large Language Model (LLM) for interactive, voice-based user commands, creating a seamless fusion of robotics and natural language understanding.`,
  },
  {
    id: 3,
    title: "Automated Conveyor Sorting and Assembly System",
    category: "Control",
    description: "Designed and developed a robotic workcell for efficient colour-based cubes sorting and assembly.",
    image: "./images/conveyor.jpg",
    tags: ["SolidWorks", "Arduino", "MATLAB" , "Python", "Motor Control"],
    details: `Designed and developed a robotic workcell for efficient colour-based object sorting and assembly, featuring an RRR manipulator (calculated inverse kinematics), conveyor, and an IoT-based control system for streamlined operations.`,
  },
  {
    id: 4,
    title: "Line Following Robot Using PID algorithm",
    category: "Control",
    description: "Worked on various design parameters, such as selection of sensors, CAD modelling, motor speed optimization and PID Tuning to complete the line following as fast as it could.",
    image: "./images/line_follower.jpg",
    tags: ["Solidworks", "Ardiono IDE", "Embedded C", "PID Control", "3D Printing"],
    details: `Worked on various design parameters, such as selection of sensors, CAD modelling, and motor speed optimization to complete the line following as fast as it could. focusing mainly on PID tuning.Participated in the Reroute competition organized by the SRM Institute ofScience and Technology.`,
  },
  {
    id: 5,
    title: "Obstacle Avoidance Robot",
    category: "Control",
    description: "Developed a obstacle avoidance,overcoming technical challenges in sensor selection and control algorithm design.",
    image: "./images/obstacle.jpg",
    tags: ["Solidworks", "Arduino IDE ", "Embedded C"],
    details: `Developed a obstacle avoidance robot that uses ultrasonic sensor to navigate.motor driver L298N has been used to control motors.`,
  },
  {
    id: 6,
    title: "Probabilistic Route Mapping for a Mobile Robot",
    category: "Software Simulation",
    description: "Mapped an indoor arena for a mobile robot using a binary occupancy grid.",
    image: "./images/probablistic.jpg",
    tags: ["MATLAB", "Probabilistic Route ", "Path Planning"],
    details: `Mapped an indoor arena for a mobile robot using a binary occupancy grid, simulating probabilistic route map to determine the most efficient path between designated points on MATLAB.`,
  },
  {
    id: 7,
    title: "Kinematics Simulation for RRR manipulator",
    category: "Math & Design & Physics",
    description: "Developed a obstacle avoidance,overcoming technical challenges in sensor selection and control algorithm design.",
    image: "./images/manipulator.jpg",
    tags: ["Solidworks", "Arduino IDE ", "Embedded C"],
    details: `This project involves systematic modeling of robotic arms using the Denavit-Hartenberg (DH) convention. It covers frame assignment, computation of DH parameters, and derivation of forward kinematics for RPR and PRR manipulators. A brief theoretical explanation about transformation matrix structure is also included.

- Frame assignments for RPR and PRR manipulators based on schematics from standard references. - Construction of DH tables for both manipulators with consistent frame alignment. - Derivation of forward kinematics via symbolic matrix multiplication. - Geometric interpretation of rotation/translation behavior through transformation matrix analysis. - Analytical justification for structural properties in transformation matrices (e.g., zero values in specific entries).`,
  },
  {
    id: 8,
    title: "Monowheel",
    category: "Math & Design",
    description: "The MONOWHEEL is a versatile single wheeled electric vehicle customized in accordance to the needs of a short distance travel under the safety norms. ",
    image: "./images/monowheel.jpg",
    tags: ["Solidworks", "Design", "Simulation","Ansys"],
    details: `MONOWHEEL is a single-wheel electronic bike that has a structure resembling an ostrich bird anatomy. It is extremely user-friendly because of its extremely balanced structure.Ostro-wheel has a rear carriage for carrying household loads and goods. It has a sturdy and strong chassis which makes it aerodynamically stable. It has very unique and new features like it have a rear 360-degree wheel for stability with a damper on it and the user can adjust its handle and seat height also according to the user’s height following laws of ergonomics.`,
  },
  {
    id: 9,
    title: "IOT Based smart fatory",
    category: "Software Simulation",
    description: "Designed an IoT‑enabled Smart Factory system that boosts efficiency, enables predictive maintenance, and drives agile, sustainable manufacturing across industries.",
    image: "./images/factory.jpg",
    tags: ["ARDUINO", "Embedded Systems", "Internet Of Things(IOT)", "Sensor Integration & Data Acquisition", "Real‑Time Data Processing"],
    details: `This project develops an IoT‑enabled Smart Factory that connects machines, sensors, and people through real‑time data exchange. The system improves production efficiency, quality control, and predictive maintenance, while reducing downtime and costs.`,
  },
  {
    id: 10,
    title: "IOT Based smart fatory",
    category: "Software Simulation",
    description: "The IoT-based Weather Data System using ESP32 aims to create a robust and efficient system for monitoring and collecting weather data in real-time. Leveraging the capabilities of the ESP32 microcontroller and various sensors, this project enables remote monitoring and analysis of weather conditions. ",
    image: "./images/wether.jpg",
    tags: ["ESP32 Microcontroller", "IoT & WiFi Connectivity", "ThingSpeak Cloud Integration", "Real‑Time Data Logging & Visualization", "Smart Monitoring Systems"],
    details: `This project demonstrates the integration of a DHT11 temperature and humidity sensor with an ESP32 microcontroller, enabling real‑time environmental data collection and wireless transmission. The ESP32 is programmed to connect to WiFi, acquire sensor readings, and publish them to a ThingSpeak IoT cloud channel using API keys. The system supports both hardware implementation and simulation, allowing validation of data flow, visualization of trends, and analysis of sensor performance. By combining IoT hardware, cloud connectivity, and data analytics, the project highlights a practical application of smart monitoring systems within the Industry 4.0 framework.`,
  },

  {
    id: 11,
    title: "Voice Control Home Automation",
    category: "Software Simulation",
    description: "Built a voice controlled IoT lighting system by integrating Adafruit IO, IFTTT, and Google Assistant for real‑time smart home automation.",
    image: "./images/voice.jpg",
    tags: ["IoT Cloud Integration (Adafruit IO)", "Voice Automation (Google Assistant / IFTTT)", "Smart Home Prototyping", "Real‑Time Dashboard Visualization"],
    details: `This project showcases the development of a voice‑controlled IoT lighting system by integrating Adafruit IO, IFTTT, and Google Assistant. A dedicated feed and dashboard were created in Adafruit IO to monitor the light status, with an indicator block configured to display red or green based on the feed values. Using IFTTT, custom applets were built to link Google Assistant voice commands with Adafruit IO actions, enabling seamless control of the virtual “home_bulb” device.
Through this setup, users can issue simple voice commands like “Turn on the lights” or “Turn off the lights” to update the Adadruit feed in real time, instantly reflecting changes on the dashboard. The project highlights practical skills in IoT cloud integration, voice automation, and smart home prototyping, demonstrating how cloud platforms and AI assistants can be combined to create intuitive, user‑friendly automation systems.`,
  },
  {
    id: 12,
    title: "Natural Language Interface for ROS-Based Robots",
    category: "AI & ML",
    description: "Developed a voice-based robot assistant integrating Ollama’s LLaMA NLP model with ROS for offline natural language interaction and real-time voice responses.",
    image: "./images/wetherr.jpg",
    tags: ["NLP", "Ollama", "Voice Assistant", "Robotics",],
    details: `This project involved building a voice-based NLP assistant for a mobile robot, powered by the Ollama LLaMA model for offline natural language understanding. The system was implemented as a ROS node (ollama_nlp_node.py) that processes user input — either through text or voice — and generates natural, context-aware responses. The assistant also features text-to-speech output, enabling fully spoken interaction with the robot.

Beyond simple dialogue, the assistant can perform a range of intelligent tasks such as setting reminders, providing world time updates (with timezone support), and managing a stopwatch and timer. This integration bridges conversational AI with autonomous robotics, enabling intuitive human-robot communication without reliance on cloud-based services.`,
  },

  {
    id: 13,
    title: "Millet Classification using Yolo V8",
    category: "AI & ML",
    description: "Built a deep learning-based image classification model to accurately identify and categorize different millet varieties using Yolo V8",
    image: "./images/milletsclass.jpg",
    tags: ["DeepLearning", "Machine Learning", "CNN", "Image Processing", "Python", "TensorFlow", "Yolo V8"],
    details: `Developed a deep learning-based image classification system to automatically identify and categorize different millet varieties using Yolo V8. The project involved dataset preprocessing, image augmentation, and model training to improve accuracy and robustness under varying lighting and texture conditions. This work demonstrates the application of AI in agriculture, enabling faster and more reliable grain recognition for research and quality assessment.`,
  },
];

// --- REMOVED COURSE DATA ---

// --- Filter Categories (from your Expertise Domains) ---
const filterCategories = [
  "All",
  "Control", // Renamed for clarity in filter logic
  "Math & Design", // Renamed for clarity in filter logic
  "Software Simulation",
  "AI & ML",
];

// Map for Domain Icons
const domainIcons = {
  "Control & Hardware": Zap,
  "Math & Design": Compass,
  "Software Simulation": Code,
  "AI & ML": Cpu,
};

// Data for Expertise Domains - ADDED filter property
const expertiseDomains = [
  { title: "Control & Hardware", filter: "Control", color: "blue", desc: "Prototyping, Sensor Integration, Embedded Systems, and system control." },
  { title: "Math & Design", filter: "Math & Design", color: "purple", desc: "kinematics, Matlab Simulations and Solidworks." },
  { title: "Software Simulation", filter: "Software Simulation", color: "green", desc: "ROS, Gazebo, URDF, and system integration for virtual testing." },
  { title: "AI & ML", filter: "AI & ML", color: "orange", desc: "Deep learning (CNNs, RNNs), CV, and NLP for intelligent systems." },
];

function MovingStars() {
  const starsRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => (scrollRef.current = window.scrollY * 0.0015);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y = scrollRef.current;
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />;
}

export default function LandingPage() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  // REMOVED: const coursesRef = useRef(null);

  // --- State for filters ---
  const [activeProjectFilter, setActiveProjectFilter] = useState("All");
  // REMOVED: const [activeCourseFilter, setActiveCourseFilter] = useState("All");

  // --- State for Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Will store the selected project/course data

  const scrollToAbout = () => {
    if (aboutRef.current) aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToWork = () => {
    if (workRef.current) workRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    if (projectsRef.current) projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  // REMOVED: const scrollToCourses = () => { ... };
  
  useEffect(() => {
    const hash = window.location.hash;
    
    // Use a slight delay to ensure the page has fully rendered before scrolling
    const timer = setTimeout(() => {
      if (hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === '#projects' && projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
      }
      // Clean the hash from the URL after scrolling
      if (hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }, 100); 

    return () => clearTimeout(timer); // Cleanup timer

  }, []);
  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/vineth-joseph-mallavarapu/", "_blank");
  };

  // --- Modal Open/Close Handlers ---
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const colorMap = {
    blue: { rgb: "0, 120, 255", border: "#0096ff", glow: "0, 120, 255" },
    purple: { rgb: "170, 50, 255", border: "#aa32ff", glow: "170, 50, 255" },
    green: { rgb: "0, 200, 120", border: "#00c878", glow: "0, 200, 120" },
    orange: { rgb: "255, 140, 0", border: "#ff8c00", glow: "255, 140, 0" },
  };

  // RE-DEFINED: This style is now for the vertical list items, not 4 parallel cards.
  const domainListItemStyle = (colorKey) => {
    const c = colorMap[colorKey] || colorMap.blue;
    return {
      padding: "20px 30px",
      borderRadius: "10px",
      backgroundColor: `rgba(${c.rgb}, 0.08)`,
      borderLeft: `5px solid ${c.border}`,
      boxShadow: `0 0 12px rgba(${c.glow}, 0.15)`,
      color: "#e6ffff",
      transition: "all 0.3s ease",
      cursor: "pointer", // MODIFIED: Changed from 'default' to 'pointer'
      display: "flex",
      alignItems: "center",
      gap: "20px",
    };
  };

  // RE-DEFINED: Removed complex hover effect as the layout is simpler now.
  const handleHover = (e, colorKey, enter) => {
    const c = colorMap[colorKey] || colorMap.blue;
    if (enter) {
      e.currentTarget.style.borderLeft = `5px solid #0ff`;
      e.currentTarget.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.4)`;
    } else {
      e.currentTarget.style.borderLeft = `5px solid ${c.border}`;
      e.currentTarget.style.boxShadow = `0 0 12px rgba(${c.glow}, 0.15)`;
    }
  };

  const tabButtonStyle = {
    background: "transparent",
    border: "1px solid #0ff",
    color: "#0ff",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 0 10px rgba(0,255,255,0.3)",
    display: "flex", // Added for icon centering
    alignItems: "center",
    justifyContent: "center",
  };
  
  // Specific style for View Details button to distinguish it
  const viewDetailsButtonStyle = {
    background: "#0ff",
    border: "1px solid #0ff",
    color: "#000",
    padding: "8px 15px",
    borderRadius: "8px", // More rectangular for a button
    cursor: "pointer",
    fontFamily: "Orbitron, sans-serif",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    marginTop: "15px", // Spacing from tags/description
    alignSelf: 'flex-start', // Align button to the start of the flex container
  };

  // --- New Styles for Project/Course Section ---
  const sectionStyle = {
    padding: "60px 50px",
    fontFamily: "Orbitron, sans-serif",
    color: "#e6ffff",
    position: "relative",
    zIndex: 10,
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "30px",
    textShadow: "0 0 10px #0ff",
    textAlign: "left",
    color: "#0ff",
  };

  const filterTabContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "30px",
  };

  const filterTabStyle = {
    background: "transparent",
    border: "1px solid rgba(0, 255, 255, 0.5)",
    color: "#0ff",
    padding: "10px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontFamily: "Orbitron, sans-serif",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  };

  const activeFilterTabStyle = {
    ...filterTabStyle,
    background: "#0ff",
    color: "#000",
    fontWeight: "bold",
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
  };

  const cardGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    justifyContent: "center",
  };

  const cardStyle = {
    flex: "1 1 350px", // Each card aims for 350px width
    maxWidth: "400px", // Max width to prevent them from getting too large
    minWidth: "300px", // Min width for smaller screens
    backgroundColor: "rgba(0, 40, 60, 0.4)", // Darker semi-transparent blue
    border: "1px solid rgba(0, 255, 255, 0.3)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(6px)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "#e6ffff",
    display: 'flex', // Added to make content align nicely with button at bottom
    flexDirection: 'column',
    justifyContent: 'space-between', // Pushes button to bottom
  };

  const cardImageStyle = {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderBottom: "1px solid rgba(0, 255, 255, 0.3)",
  };

  const cardContentStyle = {
    padding: "20px",
    flexGrow: 1, // Allows content to take available space
    display: 'flex',
    flexDirection: 'column',
  };

  const cardTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#0ff",
    marginBottom: "10px",
    textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
  };

  const cardDescriptionStyle = {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    marginBottom: "10px", // Reduced for button spacing
    color: "#dff",
  };

  const cardTagContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px", // For spacing the view details button
  };

  const cardTagStyle = {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    border: "1px solid rgba(0, 255, 255, 0.2)",
    color: "#0ff",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: "500",
  };

  // --- Filtered Data ---
  const filteredProjects = projectData.filter(
    (project) => activeProjectFilter === "All" || project.category === activeProjectFilter
  );

  // REMOVED: const filteredCourses = ...

  return (
    <div
      style={{
        width: "100vw",
        position: "relative",
        color: "#0ff",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "transparent", // transparent so stars show through
      }}
    >
      <NavBar 
        scrollToAbout={scrollToAbout} 
        scrollToProjects={scrollToProjects} 
      // REMOVED: scrollToCourses prop
      /> 

      {/* Background Stars */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MovingStars />
        </Canvas>
      </div>

      {/* Hero Section (MODIFIED: Split-Screen Layout) */}
      <div 
        style={{ 
          height: "100vh", 
          width: "100%", 
          position: "relative", 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: "0 80px", // Added padding
          zIndex: 10,
        }}
      >
        {/* Left Side: Text and Buttons (Left-Aligned) */}
        <div 
          style={{ 
            flex: '1 1 50%', 
            maxWidth: '700px', 
            fontFamily: "Orbitron, sans-serif", 
            textShadow: "0 0 8px #0ff", 
          }}
        >
          <h1 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
            Welcome to my Portfolio!
          </h1>

          <h2 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
            Hello, I'm Vineth Joseph Mallavarapu
          </h2>

          <div style={{ minHeight: "100px", fontSize: "3rem" }}>
            <TypeAnimation
              sequence={[
                "Mechatronics Engineer", 1000,
                "Robotics and Biomechanical Engineering", 2000,
//                 "Candidate to Engineering Profession", 1000,
              ]}
              speed={30}
              wrapper="div"
              repeat={Infinity}
            />
          </div>

          <p style={{ marginTop: "10px", fontSize: "1rem", lineHeight: "1.5em" }}>
            Pursuing a Master’s in Mechatronics, Robotics, and Biomechanical Engineering at the Technical University of Munich, building on a strong foundation in Mechatronics and Robotics.
          </p>

          <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
            <button
              onClick={scrollToProjects} // Changed to scroll directly to Projects
              style={{ 
                ...viewDetailsButtonStyle, // Used a more prominent style for the main CTA
                background: '#0ff',
                color: '#000',
                padding: "12px 24px",
                borderRadius: "30px", 
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0ff")}
            >
              View Projects
            </button>
            
            <button
              onClick={openLinkedIn}
              style={{ 
                ...tabButtonStyle, 
                borderRadius: "30px", 
                padding: "12px 24px",              border: "1px solid #0ff",
                color: '#0ff',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Let's Connect
            </button>
          </div>
        </div>

        {/* Right Side: Image/Visual (New Position) */}
        <div style={{ flex: '1 1 40%', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/vineth_pro.JPG" 
            alt="Profile" 
            style={{ 
              width: "280px", 
              height: '360px',
              objectFit: 'contain',
              borderRadius: "10%", // Changed to slightly rounded rectangle
              border: "4px solid #0ff",
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.4)",
            }} 
          />
        </div>
      </div>

      {/* About Me (UNCHANGED) */}
      <section
        ref={aboutRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          padding: "80px 80px",
          fontFamily: "Orbitron, sans-serif",
          justifyContent: "Left",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "550px", flex: "1 1 60%", textAlign: "left" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px", textShadow: "0 0 10px #0ff" }}>About Me</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8em", marginBottom: "15px" }}>
            I am currently pursuing a Master’s in Mechatronics, Robotics, and Biomechanical Engineering at the Technical University of Munich, building on a strong foundation in Mechatronics from SRM Institute of Science and Technology.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8em", marginBottom: "15px" }}>
            My background has fueled a passion for robotics, intelligent control systems, and smart machines that integrate mechanical design with real-time decision-making.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8em" }}>
          Driven by curiosity and continuous learning, I aim to develop autonomous and intelligent systems that can positively influence industries such as automation, healthcare, and sustainable technologies.
          </p>
        </div>

        <div
          style={{
            flex: "1 1 35%",
            maxWidth: "450px",
            backgroundColor: "#111",
            border: "2px solid #0ff",
            borderRadius: "12px",
            padding: "30px",
            color: "#0ff",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", textShadow: "0 0 8px #0ff" }}>
            Education & Skills
          </h2>

          <div style={{ marginBottom: "25px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>🎓 Education</h3>
            <p style={{ marginBottom: "10px" }}>
              <strong>Technical University of Munich</strong><br />
              MSc in Mechatronics, Robotics & Biomechanical Engineering
            </p>
            <p>
              <strong>SRM Institute of Science and Technology</strong><br />
              B.Tech in Mechatronics Engineering with Specialization in Robotics
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>🛠️ Skills</h3>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}>
              {[
                "ROS", "SLAM", "Autonomous Navigation", "Computer Vision",
                "ESP32 & IoT", "SolidWorks", "LLMs & NLP",
                "Manipulators","Robotic Welding","Arduino","Rapberry Pi","Python","C++"
              ].map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#0ff",
                    color: "#000",
                   padding: "8px 14px",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Section (MODIFIED: Vertical List Layout) */}
      <section
        ref={workRef}
        style={{
          padding: "60px 80px", // Adjusted padding
       fontFamily: "Orbitron, sans-serif",
          color: "#e6ffff",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "40px", textShadow: "0 0 10px #0ff", textAlign: "center" }}>Expertise</h2>

        {/* --- MODIFIED: New Vertical List Container --- */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "15px", // Vertical spacing
          maxWidth: '1000px', // Constrain width for better readability
          margin: '0 auto', // Center the list
        }}>
          {expertiseDomains.map((domain) => {
            const Icon = domainIcons[domain.title];
            
            // Handler to set filter and scroll
            const handleDomainClick = (filter) => {
              setActiveProjectFilter(filter); // Set the project filter state
              scrollToProjects(); // Scroll down to the projects section
            };

            return (
              <div
                key={domain.title}
                style={domainListItemStyle(domain.color)}
                onMouseEnter={(e) => handleHover(e, domain.color, true)}
                onMouseLeave={(e) => handleHover(e, domain.color, false)}
                onClick={() => handleDomainClick(domain.filter)} // ADDED: onClick handler
              >
                <Icon size={40} style={{ color: colorMap[domain.color].border, flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.4rem", margin: 0, marginBottom: "5px", color: "#fff" }}>
                    {domain.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", margin: 0, lineHeight: "1.5" }}>
                    {domain.desc}
                  </p>
                </div>
                {/* REMOVED: "See all related projects" button */}
              </div>
            );
          })}
        </div>
      </section>

    {/* --- Projects Section --- */}
    <section ref={projectsRef} style={sectionStyle}>
      <h2 style={titleStyle}>Featured Projects</h2>

      {/* Filter Tabs */}
      <div style={filterTabContainerStyle}>
        {filterCategories.map((category) => (
          <button
            key={category}
            style={category === activeProjectFilter ? activeFilterTabStyle : filterTabStyle}
            onClick={() => setActiveProjectFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Card Grid */}
      <div style={cardGridStyle}>
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
            }}
          >
            <img src={project.image} alt={project.title} style={cardImageStyle} />
            <div style={cardContentStyle}>
              <div> {/* Wrapper for top content */}
                <h3 style={cardTitleStyle}>{project.title}</h3>
                <p style={cardDescriptionStyle}>{project.description}</p>
                <div style={cardTagContainerStyle}>
                  {project.tags.map((tag, index) => (
                    <span key={index} style={cardTagStyle}>{tag}</span>
                  ))}
                </div>
              </div>
              <button
                style={viewDetailsButtonStyle}
                onClick={() => openModal(project)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0ff")}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* --- REMOVED COURSES SECTION --- */}

    {/* --- Modal --- */}
    {isModalOpen && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          overflowY: 'auto',
          padding: '20px',
        }}
        onClick={closeModal}
      >
        <div
          style={{
            position: 'relative',
            background: "rgba(10, 30, 40, 0.9)",
            border: "1px solid #0ff",
            borderRadius: "15px",
            maxWidth: "800px",
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            color: "#e6ffff",
            fontFamily: "Orbitron, sans-serif",
            boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "transparent",
              border: "none",
              color: "#0ff",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <X size={30} />
          </button>

          {/* Modal Content */}
          <img 
            src={modalContent.image} 
            alt={modalContent.title} 
            style={{ 
              width: '100%', 
              height: '350px', 
              objectFit: 'cover', 
              borderTopLeftRadius: '14px', 
              borderTopRightRadius: '14px' 
            }} 
          />
          
          <div style={{ padding: '30px' }}>
            <h2 style={{ ...cardTitleStyle, fontSize: '2rem', marginBottom: '15px' }}>
              {modalContent.title}
            </h2>
            
            <div style={{ ...cardTagContainerStyle, marginBottom: '20px' }}>
              {modalContent.tags.map((tag, index) => (
                <span key={index} style={cardTagStyle}>{tag}</span>
              ))}
            </div>

            <h4 style={{ color: '#0ff', marginBottom: '10px', fontSize: '1.1rem' }}>Description</h4>
            <p style={{ 
              ...cardDescriptionStyle, 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              whiteSpace: 'pre-wrap' // Preserves formatting from the details string
            }}>
              {modalContent.details}
            </p>
          </div>
        </div>
      </div>
    )}

  </div>
  );
}