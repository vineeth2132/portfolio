import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ExperiencePage from "./pages/ExperiencePage";
import AcademicsPage from "./pages/AcademicsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import MediaPage from "./pages/MediaPage";

export default function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const direct = searchParams.get("direct") === "true";

  return (
    <Routes>
      <Route path="/" element={<LandingPage skipIntro={direct} />} />
      <Route path="/about" element={<><NavBar /><HomePage /></>} />
      <Route path="/projects" element={<><NavBar /><ProjectsPage /></>} />
      <Route path="/projects/:projectId" element={<><NavBar /><ProjectDetailsPage /></>} />
      <Route path="/experience" element={<><NavBar /><ExperiencePage /></>} />
      <Route path="/academics" element={<><NavBar /><AcademicsPage /></>} />
      <Route path="/resume" element={<><NavBar /><ResumePage /></>} />
      <Route path="/contact" element={<><NavBar /><ContactPage /></>} />
      <Route path="/media" element={<><NavBar /><MediaPage /></>} />
    </Routes>
  );
}
