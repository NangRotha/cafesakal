// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import AboutUsSection from '../components/AboutUsSection';
import Menu from '../pages/Menu';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <Menu />
    </>
  );
};

export default HomePage;
