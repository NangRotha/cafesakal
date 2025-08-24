// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import AboutUsSection from '../components/AboutUsSection';
import FeaturedMenu from '../components/FeaturedMenu'; // Import the new FeaturedMenu component

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <FeaturedMenu /> {/* Use the new FeaturedMenu component */}
    </>
  );
};

export default HomePage;
