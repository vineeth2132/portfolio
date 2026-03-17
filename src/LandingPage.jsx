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
    tags: ["Deep learning", "Pytorch", "Computer Vision", "Algorithm Development", "Solidworks", "Arduino", "RaspberryPi"],
    details: `Developed an automated millet classification system that uses deep learning for accurate millet variety identification via an upper camera with an accuracy of 85%, coupled with load cells for weight estimation.This project is also featured with automated billing systems basically automates the process of purchasing loose groceries such as millets,Atta,Dal and so on.`,
  },
  {
    id: 2,
    title: "Automonous Mobile Robot usign SLAM Algorithm - currently working",
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
    details: `Worked on various design parameters, such as selection of sensors, CAD modelling, and motor speed optimization to complete the line following as fast as it could. focusing mainly on PID tuning.Participated in the Reroute competition organized by the SRM Institute of Science and Technology.`,
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
    category: "Math & Design",
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
    title: "Natural Language Interface for ROS-Based Robots - currently working",
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
References: [3]
  },
];

const filterCategories = [
  "All",
  "Control",
  "Math & Design",
  "Software Simulation",
  "AI & ML",
];

const domainIcons = {
  "Control & Hardware": Zap,
  "Math & Design": Compass,
  "Software Simulation": Code,
  "AI & ML": Cpu,
};

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

// --- CSS Styles ---
// We inject all styles this way to keep it in one file and allow for media queries.
const allStyles = `
  .landing-page-container {
    width: 100%;
    position: relative;
    color: #0ff;
    min-height: 100vh;
    overflow-x: hidden;
    background: transparent;
  }

  .stars-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  /* --- Hero Section --- */
  .hero-section {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    z-index: 10;
  }

  .hero-content {
    flex: 1 1 50%;
    max-width: 700px;
    font-family: "Orbitron", sans-serif;
    text-shadow: 0 0 8px #0ff;
  }

  .hero-welcome {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .hero-name {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  .hero-type-animation {
    min-height: 100px;
    font-size: 3rem;
  }

  .hero-description {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 1.5em;
  }

  .hero-buttons {
    margin-top: 30px;
    display: flex;
    gap: 20px;
  }

  .hero-btn-primary {
    background: #0ff;
    border: 1px solid #0ff;
    color: #000;
    padding: 12px 24px;
    border-radius: 30px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.2s ease;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }
  .hero-btn-primary:hover {
    background: #fff;
  }

  .hero-btn-secondary {
    background: transparent;
    border: 1px solid #0ff;
    color: #0ff;
    padding: 12px 24px;
    border-radius: 30px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.2s ease;
    box-shadow: 0 0 10px rgba(0,255,255,0.3);
  }
  .hero-btn-secondary:hover {
    background: #0ff;
    color: #000;
  }

  .hero-image-container {
    flex: 1 1 40%;
    display: flex;
    justify-content: center;
  }

  .hero-profile-img {
    width: 280px;
    height: 360px;
    object-fit: contain;
    border-radius: 10%;
    border: 4px solid #0ff;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
  }

  /* --- About Section --- */
  .about-section {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    padding: 70px 70px;
    font-family: "Orbitron", sans-serif;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    z-index: 10;
    color: #e6ffff;
  }

  .about-text {
    max-width: 550px;
    flex: 1 1 60%;
    text-align: left;
  }

  .about-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 0 0 10px #0ff;
    color: #0ff;
  }

  .about-paragraph {
    font-size: 1.1rem;
    line-height: 1.8em;
    margin-bottom: 15px;
  }

  .about-skills-box {
    flex: 1 1 35%;
    max-width: 450px;
    background-color: #111;
    border: 2px solid #0ff;
    border-radius: 12px;
    padding: 30px;
    color: #0ff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }

  .about-skills-title {
    font-size: 2rem;
    margin-bottom: 20px;
    text-shadow: 0 0 8px #0ff;
  }

  .about-skills-subtitle {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .skills-tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-tag {
    background-color: #0ff;
    color: #000;
    padding: 8px 14px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: bold;
    white-space: nowrap;
  }

  /* --- Expertise Section --- */
  .expertise-section {
    padding: 60px 80px;
    font-family: "Orbitron", sans-serif;
    color: #e6ffff;
    position: relative;
    z-index: 10;
  }

  .section-title-center {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-shadow: 0 0 10px #0ff;
    text-align: center;
    color: #0ff;
  }

  .expertise-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  /* .expertise-item styles are handled by dynamic domainListItemStyle */
  .expertise-item-title {
    font-size: 1.4rem;
    margin: 0;
    margin-bottom: 5px;
    color: #fff;
  }

  .expertise-item-desc {
    font-size: 0.95rem;
    margin: 0;
    line-height: 1.5;
  }

  /* --- Projects Section --- */
  .projects-section {
    padding: 60px 50px;
    font-family: "Orbitron", sans-serif;
    color: #e6ffff;
    position: relative;
    z-index: 10;
  }

  .section-title-left {
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 0 0 10px #0ff;
    text-align: left;
    color: #0ff;
  }

  .filter-tabs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 30px;
  }

  .filter-tab {
    background: transparent;
    border: 1px solid rgba(0, 255, 255, 0.5);
    color: #0ff;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  .filter-tab-active {
    background: #0ff;
    border: 1px solid #0ff;
    color: #000;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }

  .project-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
  }

  .project-card {
    flex: 1 1 300px;  /* Make the "ideal" size smaller */
    max-width: 350px;  /* Keep a reasonable max size */
    min-width: 280px;  /* Allow the card to get much smaller */
    background-color: rgba(0, 40, 60, 0.4);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    color: #e6ffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.3);
  }

  .card-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  }

  .card-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #0ff;
    margin-bottom: 10px;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }

  .card-description {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 10px;
    color: #dff;
  }

  .card-tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .card-tag {
    background-color: rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.2);
    color: #0ff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .card-details-button {
    background: #0ff;
    border: 1px solid #0ff;
    color: #000;
    padding: 8px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.2s ease;
    margin-top: 15px;
    align-self: flex-start;
  }
  .card-details-button:hover {
    background: #fff;
    border-color: #fff;
  }

  /* --- Modal Styles --- */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }

  .modal-content {
    background-color: #0a192f;
    border: 1px solid #0ff;
    border-radius: 12px;
    width: 90%;
    max-width: 800px;
    height: 80vh;
    overflow-y: auto;
    padding: 30px;
    position: relative;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
    transform: scale(0.9);
    animation: scaleIn 0.3s 0.1s forwards;
  }

  .modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #0ff;
    color: #000;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
    transition: all 0.2s ease;
  }
  .modal-close-btn:hover {
    background: #fff;
  }

  .modal-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 255, 255, 0.3);
  }

  .modal-title {
    font-size: 2rem;
    color: #0ff;
    margin-bottom: 15px;
  }

  .modal-details {
    font-size: 1rem;
    line-height: 1.7;
    white-space: pre-wrap; /* Preserves formatting */
    margin-bottom: 20px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }


  /* ---  responsiveness --- */
  
/* --- RESPONSIVENESS --- */

/* ---------- Tablet (≤1024px) ---------- */
@media (max-width: 1024px){

  .hero-section {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    padding: 20px 10px;
    gap: 12px; /* reduces white gaps */
    height: auto !important;
    min-height: auto !important;
  }

  .hero-welcome {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }

  .hero-name {
    font-size: 1.55rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .hero-type-animation {
    font-size: 1.35rem;
    min-height: 50px;
  }

  .hero-description {
    font-size: 0.95rem;
    line-height: 1.45rem;
    max-width: 92%;
    margin: 0 auto 8px auto;
  }

  .hero-profile-img {
    width: 160px;
    height: 200px;
    margin-top: 6px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    padding: 10px 18px;
    font-size: 0.85rem;
    width: 75%;
    max-width: 260px;
  }

  /* About */
  .about-section {
    flex-direction: column;
    text-align: center;
    padding: 35px 35px;
    gap: 30px;
    align-items: center;
    justify-content: flex-start;
  }

  .about-title {
    font-size: 1.8rem;
    text-align: center;
  }

  .about-paragraph {
    font-size: 1rem;
    line-height: 1.55rem;
    flex: 1 1 60%;
    text-align: left;
  }

  .about-skills-box {
    width: 100%;
    padding: 20px;
  }

  /* Expertise */
  .expertise-section {
    padding: 35px 18px;
  }

  .section-title-center {
    font-size: 1.9rem;
  }

  .expertise-item {
    text-align: center !important;
    flex-direction: column !important;
    gap: 8px;
    padding: 15px !important;
  }

  .expertise-item-title {
    font-size: 1.2rem;
  }

  .expertise-item-desc {
    font-size: 0.9rem;
  }

  /* Projects */
  .projects-section {
    padding: 35px 18px;
  }

  .section-title-left {
    text-align: center;
    font-size: 1.9rem;
  }

  .filter-tabs-container {
    justify-content: center;
  }

  .project-card {
    min-width: 260px;
  }

  .card-content {
    text-align: center;
  }

  .card-description {
    font-size: 0.9rem;
    line-height: 1.45rem;
  }

  .card-tag-container {
    justify-content: center;
  }

  .card-details-button {
    align-self: center;
  }

  /* Modal */
  .modal-content {
    padding: 20px;
    height: 88vh;
  }

  .modal-image {
    height: 200px;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .modal-details {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
}

/* ---------- Mobile (≤820px) ---------- */
@media (max-width: 820px){

  .hero-section {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    padding: 20px 10px;
    gap: 12px; /* reduces white gaps */
    height: auto !important;
    min-height: auto !important;
  }

  .hero-welcome {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }

  .hero-name {
    font-size: 1.55rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .hero-type-animation {
    font-size: 1.35rem;
    min-height: 50px;
  }

  .hero-description {
    font-size: 0.95rem;
    line-height: 1.45rem;
    max-width: 92%;
    margin: 0 auto 8px auto;
  }

  .hero-profile-img {
    width: 160px;
    height: 200px;
    margin-top: 6px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    padding: 10px 18px;
    font-size: 0.85rem;
    width: 75%;
    max-width: 260px;
  }

  /* About */
  .about-section {
    flex-direction: column;
    text-align: center;
    padding: 35px 35px;
    max-width: 300px;
    gap: 30px;
    right
    align-items: center;
    justify-content: flex-start;
  }

  .about-title {
    font-size: 1.8rem;
    text-align: center;
  }

  .about-paragraph {
    font-size: 1rem;
    line-height: 1.55rem;
    text-align: justify;
  }

  .about-skills-box {
    width: 100%;
    padding: 20px;
  }

  /* Expertise */
  .expertise-section {
    padding: 35px 18px;
  }

  .section-title-center {
    font-size: 1.9rem;
  }

  .expertise-item {
    text-align: center !important;
    flex-direction: column !important;
    gap: 8px;
    padding: 15px !important;
  }

  .expertise-item-title {
    font-size: 1.2rem;
  }

  .expertise-item-desc {
    font-size: 0.9rem;
  }

  /* Projects */
  .projects-section {
    padding: 35px 18px;
  }

  .section-title-left {
    text-align: center;
    font-size: 1.9rem;
  }

  .filter-tabs-container {
    justify-content: center;
  }

  .project-card {
    min-width: 260px;
  }

  .card-content {
    text-align: center;
  }

  .card-description {
    font-size: 0.9rem;
    line-height: 1.45rem;
  }

  .card-tag-container {
    justify-content: center;
  }

  .card-details-button {
    align-self: center;
  }

  /* Modal */
  .modal-content {
    padding: 20px;
    height: 88vh;
  }

  .modal-image {
    height: 200px;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .modal-details {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
}

/* ---------- END RESPONSIVE ---------- */


  /* --- END: MOBILE OPTIMIZATIONS --- */
`; 


export default function LandingPage() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);

  const [activeProjectFilter, setActiveProjectFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const scrollToAbout = () => {
    if (aboutRef.current) aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToWork = () => {
    if (workRef.current) workRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    if (projectsRef.current) projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    const hash = window.location.hash;
    const timer = setTimeout(() => {
      if (hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === '#projects' && projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  const openLinkedIn = () => {
    window.open("https://linkedin.com/in/vineth-joseph-4a36931a6", "_blank");
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset';
  };

  const colorMap = {
    blue: { rgb: "0, 120, 255", border: "#0096ff", glow: "0, 120, 255" },
    purple: { rgb: "170, 50, 255", border: "#aa32ff", glow: "170, 50, 255" },
    green: { rgb: "0, 200, 120", border: "#00c878", glow: "0, 200, 120" },
    orange: { rgb: "255, 140, 0", border: "#ff8c00", glow: "255, 140, 0" },
  };

  // --- DYNAMIC STYLES: Kept as-is ---
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
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    };
  };

  function handleHover(e, colorKey, enter) {
    const c = colorMap[colorKey] || colorMap.blue;
    if (enter) {
      e.currentTarget.style.borderLeft = `5px solid #0ff`;
      e.currentTarget.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.4)`;
    } else {
      e.currentTarget.style.borderLeft = `5px solid ${c.border}`;
      e.currentTarget.style.boxShadow = `0 0 12px rgba(${c.glow}, 0.15)`;
    }
  }
  // --- END DYNAMIC STYLES ---


  // --- Filtered Data ---
  const filteredProjects = projectData.filter(
    (project) => activeProjectFilter === "All" || project.category === activeProjectFilter
  )

  return (
    <>
      {/* This injects all the CSS into the page head */}
      <style>{allStyles}</style>

      <div className="landing-page-container">
      <NavBar 
        scrollToAbout={scrollToAbout} 
        scrollToProjects={scrollToProjects} 
      /> 

      {/* Background Stars */}
      <div className="stars-background">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MovingStars />
        </Canvas>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Left Side: Text and Buttons */}
        <div className="hero-content">
          <h1 className="hero-welcome">
            Welcome to my Portfolio!
          </h1>

          <h2 className="hero-name">
            Hello, I'm Vineth Joseph Mallavarapu
          </h2>

          <div className="hero-type-animation">
            <TypeAnimation
              sequence={[
                "Mechatronics Engineer", 1000,
                "Robotics and Biomechanical Engineering", 2000,
              ]}
              speed={30}
              wrapper="div"
              repeat={Infinity}
            />
          </div>

            <p className="hero-description">
              Pursuing a Master’s in Mechatronics, Robotics, and Biomechanical Engineering at the<br />
              Technical University of Munich, building on a strong foundation in Mechatronics and Robotics.
            </p>

          <div className="hero-buttons">
            <button
              onClick={scrollToProjects}
            className="hero-btn-primary"
            >
              View Projects
            </button>
            
            <button
             onClick={openLinkedIn}
              className="hero-btn-secondary"
            >
              Let's Connect
            </button>
          </div>
        </div>

        {/* Right Side: Image/Visual */}
        <div className="hero-image-container">
          <img 
            src="./images/vineth_pro.jpg"
            alt="Profile" 
            className="hero-profile-img"
          />
        </div>
      </div>

      {/* About Me */}
      <section
        ref={aboutRef}
        className="about-section"
      >
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p className="about-paragraph">
            I am currently pursuing a Master’s in Mechatronics, Robotics, and Biomechanical Engineering at the Technical University of Munich, building on a strong foundation in Mechatronics from SRM Institute of Science and Technology.
          </p>
          <p className="about-paragraph">
            My background has fueled a passion for robotics, intelligent control systems, and smart machines that integrate mechanical design with real-time decision-making.
       </p>
          <p className="about-paragraph">
          Driven by curiosity and continuous learning, I aim to develop autonomous and intelligent systems that can positively influence industries such as automation, healthcare, and sustainable technologies.
          </p>
        </div>

        <div className="about-skills-box">
          <h2 className="about-skills-title">
          Education & Skills
          </h2>

          <div style={{ marginBottom: "25px" }}>
            <h3 className="about-skills-subtitle">🎓 Education</h3>
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
            <h3 className="about-skills-subtitle">🛠️ Skills</h3>
          <div className="skills-tag-container">
              {[
                "ROS", "SLAM", "Autonomous Navigation", "Computer Vision",
                "ESP32 & IoT", "SolidWorks", "LLMs & NLP",
                "Manipulators","Robotic Welding","Arduino","Rapberry Pi","Python","C++"
              ].map((skill, index) => (
                <span key={index} className="skill-tag">
             {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Work Section (Expertise) */}
      <section ref={workRef} className="expertise-section">
        <h2 className="section-title-center">Expertise</h2>

        <div className="expertise-list">
          {expertiseDomains.map((domain) => {
            const Icon = domainIcons[domain.title];
            const handleDomainClick = (filter) => {
              setActiveProjectFilter(filter);
              scrollToProjects();
            };

            return (
              <div
                key={domain.title}
                 style={domainListItemStyle(domain.color)} // Kept dynamic style
                onMouseEnter={(e) => handleHover(e, domain.color, true)} // Kept dynamic hover
                onMouseLeave={(e) => handleHover(e, domain.color, false)} // Kept dynamic hover
                onClick={() => handleDomainClick(domain.filter)}
                className="expertise-item" // Added class for mobile styling
        >
                <Icon size={40} style={{ color: colorMap[domain.color].border, flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <h3 className="expertise-item-title">
                {domain.title}
                  </h3>
                  <p className="expertise-item-desc">
                    {domain.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
   </section>

    {/* --- Projects Section --- */}
    <section ref={projectsRef} className="projects-section">
      <h2 className="section-title-left">Featured Projects</h2>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        {filterCategories.map((category) => (
          <button
            key={category}
           className={category === activeProjectFilter ? "filter-tab-active" : "filter-tab"}
            onClick={() => setActiveProjectFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Card Grid */}
      <div className="project-grid">
     {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
          >
            <img src={project.image} alt={project.title} className="card-image" />
            <div className="card-content">
              <div> {/* Wrapper for top content */}
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>
                <div className="card-tag-container">
                    {project.tags.map((tag) => (
                    <span key={tag} className="card-tag">{tag}</span>
                    ))}
                </div>
              </div>
              <div> {/* Wrapper for button to push it down */}
                <button 
                    className="card-details-button"
                    onClick={() => openModal(project)}
                >
                    View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* --- Modal --- */}
    {isModalOpen && modalContent && (
      <div className="modal-backdrop" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
            <X size={20} />
          </button>
          
          <img src={modalContent.image} alt={modalContent.title} className="modal-image" />
      <h2 className="modal-title">{modalContent.title}</h2>

          <div className="card-tag-container" style={{ marginBottom: "20px" }}>
            {modalContent.tags.map((tag) => (
              <span key={tag} className="card-tag">{tag}</span>
         ))}
          </div>

          <p className="modal-details">{modalContent.details}</p>

        </div>
      </div>
    )}

  </div>
</>
  );
}