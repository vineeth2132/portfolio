const projectsData = [
  {
    id: "Project-1",
    title: "Automated Millet Identification and Billing System",
    description:
      "Developed an automated millet classification and billing system using deep learning for accurate millet variety identification through an overhead camera. The system achieved 85% classification accuracy and was integrated with load cells for weight estimation. It automates the purchasing process for loose groceries such as millets, atta, dal, and similar items by identifying the product, measuring weight, and generating the bill automatically.",
    techStack: ["SolidWorks", "YOLOv8", "Deep Learning", "Raspberry Pi", "Python"],
    video: "/videos/Copy of automated millet identification and billing system.mp4",
  },
  {
    id: "Project-7",
    title: "Autonomous Sub-Terrain Exploration with Quadrotor UAV",
    description: `Developed a ROS 2-based autonomous quadrotor system for a GPS-denied cave exploration challenge in a Unity simulation environment. The UAV was designed to navigate through a cave, detect lanterns, estimate their 3D world-frame poses, and build a 3D voxel-grid map of the environment.

My contribution focused on the perception and sensor-processing pipeline. I worked on depth-image processing, point-cloud generation, RGB/depth lantern detection, and semantic-camera-based detection using OpenCV. The system integrated RealSense depth data, RGB and semantic camera streams, TF transformations, OctoMap mapping, RViz visualization, and ROS 2 topic-based communication.

This project is highly relevant to computer vision, robotics infrastructure, and robotic teleoperation/interface development because it involved object detection, sensor-stream integration, 3D visualization, simulation-based testing, and debugging of perception outputs in a robotic system.`,
    techStack: [
      "ROS 2 Jazzy",
      "Unity",
      "OpenCV",
      "OctoMap",
      "RViz",
      "TF2",
      "Point Cloud Processing",
      "Python",
      "C++",
    ],
    // video: "/videos/autonomous-subterrain-exploration.mp4",
  },
  {
    id: "Project-0",
    title: "Autonomous Mobile Robot using SLAM Algorithm",
    description:
      "Designed and developed an autonomous mobile robot using ROS 2 Jazzy for navigation and control. Implemented SLAM algorithms to enable real-time mapping, localization, and autonomous path planning. Integrated a LLaMA-based large language model for interactive voice-based user commands, combining robotics, autonomous navigation, and natural language interaction.",
    techStack: ["SolidWorks", "Raspberry Pi", "Python", "ROS 2", "SLAM", "LLM"],
    // video: "/videos/clim3.mp4",
  },
  {
    id: "Project-2",
    title: "Automated Conveyor Sorting and Assembly System",
    description:
      "Designed and developed a robotic workcell for colour-based object sorting and assembly. The system featured an RRR manipulator with inverse kinematics, a conveyor mechanism, and an IoT-based control system for automated object handling and streamlined operation.",
    techStack: ["SolidWorks", "Arduino IDE", "MATLAB", "Python"],
    video: "/videos/Copy of pick and place robot working.mp4",
  },
  {
    id: "Project-3",
    title: "Line Following Robot using PID Algorithm",
    description:
      "Worked on sensor selection, CAD modelling, motor speed optimization, and PID tuning to improve the performance of a line-following robot. Participated in the Reroute competition organized by SRM Institute of Science and Technology.",
    techStack: ["SolidWorks", "Arduino IDE", "Embedded C"],
    video: "/videos/clim.mp4",
  },
  {
    id: "Project-4",
    title: "Obstacle Avoidance Robot",
    description:
      "Developed a self-navigating robot capable of autonomous navigation and obstacle avoidance. Worked on sensor selection, path planning logic, and control algorithm design to improve reliability in dynamic environments.",
    techStack: ["SolidWorks", "Arduino IDE", "Embedded C"],
    video: "/videos/clim4.mp4",
  },
  {
    id: "Project-6",
    title: "Probabilistic Route Mapping for a Mobile Robot",
    description:
      "Mapped an indoor arena for a mobile robot using a binary occupancy grid and simulated probabilistic route mapping in MATLAB to determine the most efficient path between designated points.",
    techStack: ["MATLAB"],
    video: "/videos/clim2.mp4",
  },
];

export default projectsData;