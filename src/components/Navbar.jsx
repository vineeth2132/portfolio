// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
// You may need to create a simple Navbar.css file if you haven't yet,
// but all the logic for scrolling is here.
import "./Navbar.css"; 

export default function Navbar({ scrollToAbout, scrollToProjects }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- NEW LOGIC for Scroll/Navigation Fix ---
  const handleScrollLinkClick = (e, scrollFunction, targetPath) => {
    e.preventDefault();
    
    // Check if we are currently on the root path
    if (window.location.pathname === '/') {
      // If on the root page, just scroll
      if (scrollFunction) {
        scrollFunction();
      }
    } else {
      // If on another page, navigate to the root path with the target path as a hash
      // The LandingPage useEffect will read this hash and scroll after the page loads.
      window.location.href = `/${targetPath}`;
    }
  };

  return (
    <nav className={`ios-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-center">
        {/* About (SCROLLS or NAVIGATES to home#about) */}
        <a
          href="/#about"
          onClick={(e) => handleScrollLinkClick(e, scrollToAbout, '#about')}
          className="nav-link"
        >
          About
        </a>

        {/* Projects (SCROLLS or NAVIGATES to home#projects) */}
        <a
          href="/#projects"
          onClick={(e) => handleScrollLinkClick(e, scrollToProjects, '#projects')}
          className="nav-link"
        >
          Projects
        </a>

        {/* Other links (Standard Navigation) */}
        <a href="/experience" className="nav-link">Experience</a>
        <a href="/academics" className="nav-link">Academics</a>
        <a href="/resume" className="nav-link">Resume</a>
        <a href="/contact" className="nav-link">Contact</a>
        <a href="/media" className="nav-link">Media</a>
      </div>
    </nav>
  );
}