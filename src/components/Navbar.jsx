// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Import the icons
import "./Navbar.css"; 

export default function Navbar({ scrollToAbout, scrollToProjects }) {
  const [scrolled, setScrolled] = useState(false);
  
  // --- NEW: State for the mobile menu ---
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- NEW: Function to toggle the mobile menu ---
  const toggleMobileMenu = () => {
    // Toggle the state
    const newIsOpen = !isMobileOpen;
    setIsMobileOpen(newIsOpen);
    
    // Prevent the body from scrolling when the menu is open
    if (newIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // --- Your existing logic (PERFECT, NO CHANGES) ---
  const handleScrollLinkClick = (e, scrollFunction, targetPath) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      if (scrollFunction) {
        scrollFunction();
      }
    } else {
      window.location.href = `/${targetPath}`;
    }
  };

  return (
    <>
      {/* --- THE MAIN NAVBAR --- */}
      <nav className={`ios-navbar ${scrolled ? "scrolled" : ""}`}>
        
        {/* Based on your CSS, adding a logo/left section */}
        <div className="nav-left">
          <a href="/" className="nav-logo">
            {/* You can put your logo text or <img> here */}
            My_Portfolio
          </a>
        </div>

        {/* --- DESKTOP LINKS (Your original links) --- */}
        <div className="nav-center">
          <a href="/#about" onClick={(e) => handleScrollLinkClick(e, scrollToAbout, '#about')} className="nav-link">About</a>
          <a href="/#projects" onClick={(e) => handleScrollLinkClick(e, scrollToProjects, '#projects')} className="nav-link">Projects</a>
          <a href="/experience" className="nav-link">Experience</a>
          <a href="/academics" className="nav-link">Academics</a>
          <a href="/resume" className="nav-link">Resume</a>
          <a href="/contact" className="nav-link">Contact</a>
          <a href="/media" className="nav-link">Media</a>
        </div>

        {/* --- HAMBURGER ICON (Shows on mobile) --- */}
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          {isMobileOpen ? <X size={28} color="#0ff" /> : <Menu size={28} color="#0ff" />}
        </div>
      </nav>

      {/* --- THE MOBILE MENU DRAWER (Covers screen when open) --- */}
      <div className={`mobile-nav-menu ${isMobileOpen ? 'open' : ''}`}>
        
        {/* --- Mobile Links --- */}
        {/* Note: We combine your logic with toggling the menu */}
        
        <a href="/#about" onClick={(e) => { handleScrollLinkClick(e, scrollToAbout, '#about'); toggleMobileMenu(); }}>
          About
        </a>
        <a href="/#projects" onClick={(e) => { handleScrollLinkClick(e, scrollToProjects, '#projects'); toggleMobileMenu(); }}>
          Projects
        </a>
        <a href="/experience" onClick={toggleMobileMenu}>Experience</a>
        <a href="/academics" onClick={toggleMobileMenu}>Academics</a>
        <a href="/resume" onClick={toggleMobileMenu}>Resume</a>
        <a href="/contact" onClick={toggleMobileMenu}>Contact</a>
        <a href="/media" onClick={toggleMobileMenu}>Media</a>
        
      </div>
    </>
  );
}