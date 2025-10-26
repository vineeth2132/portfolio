// src/components/PageLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

export default function PageLayout() {

  // Move the scroll functions here
  const scrollToAbout = () => {
    // Navigate to home and scroll
    window.location.href = '/#about';
  };
  const scrollToProjects = () => {
    // Navigate to home and scroll
    window.location.href = '/#projects';
  };

  return (
    <>
      {/* Pass the functions to the NavBar */}
      <NavBar 
        scrollToAbout={scrollToAbout}
        scrollToProjects={scrollToProjects}
      />
      <main>
        {/* Your child route (e.g., HomePage, MediaPage) will render here */}
        <Outlet /> 
      </main>
    </>
  );
}