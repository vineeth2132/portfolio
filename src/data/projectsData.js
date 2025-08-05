const projectsData = [
  {
    id: "Project-1",
    title: "Automated Millet identification and Billing System",
    description:
      " Developed an automated millet classification system that uses deep learning for accurate millet variety identification via an upper camera with an accuracy of 85%, coupled with load cells for weight estimation.This project is also featured with automatd billing systems basically automates the process of purchasing loose groceries such as millets,Atta,Dal and so on",
    techStack: ["SolidWorks", "Deep Learning - Yolo V8", "Raspberry Pi" , "Python"],
    model:"/models/assem1.glb",
  },
  {
    id: "Project-0",
    title: "Automonous Mobile Robot usign SLAM Algorithm",
    description:
      "Designed and developed an autonomous mobile robot leveraging ROS 2 Jazzy for navigation and control. Implemented SLAM (Simultaneous Localization and Mapping) algorithms to enable real-time mapping and autonomous path planning. Additionally, integrated a LLaMA-based Large Language Model (LLM) for interactive, voice-based user commands, creating a seamless fusion of robotics and natural language understanding.",
    techStack: ["SolidWorks", "Raspberry PI", "Python", "ROS 2", "SLAM"],
    video: "/videos/clim3.mp4",
  },
  {
    id: "Project-2",
    title: "Automated Conveyor Sorthing and Assembly System",
    description:
      "Designed and developed a robotic workcell for efficient colour-based object sorting and assembly, featuring an RRR manipulator (calculated inverse kinematics), conveyor, and an IoT-based control system for streamlined operations.",
    techStack: ["SolidWorks", "Arduino IDE", "MATLAB" , "Python"],
    model:"/models/assem2.glb",
  },
  {
    id: "Project-3",
    title: "Line Following Robot Using PID algorithm",
    description:
      "Worked on various design parameters, such as selection of sensors, CAD modelling, and motor speed optimization to complete the line following as fast as it could. focusing mainly on PID tuning.Participated in the Reroute competition organized by the SRM Institute of Science and Technology.",
    techStack: ["Solidworks", "Ardiono IDE", "Embedded C"],
    video: "/videos/clim.mp4",
  },
  {
    id: "Project-4",
    title: "Obstacle Avoidance Robot",
    description:
      "Developed a self-navigating machine designed for autonomous navigation and obstacle avoidance,overcoming technical challenges in sensor selection, path planning, and control algorithm design.",
    techStack: ["Solidworks", "Arduino IDE ", "Embedded C"],
    video: "/videos/clim4.mp4",
  },
  {
    id: "Project-6",
    title: "Probabilistic Route Mapping for a Mobile Robot",
    description:
      "Mapped an indoor arena for a mobile robot using a binary occupancy grid, simulating probabilistic route map to determine the most efficient path between designated points on MATLAB.",
    techStack: ["MATLAB"],
    video: "/videos/clim2.mp4",
  },
];

export default projectsData;
