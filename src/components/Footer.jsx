// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 md:px-12 rounded-t-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-xl font-semibold">Cafesakal University &copy; 2025</p>
          <p className="text-sm text-gray-400">"Per Scientiam Ad Sapientiam" - Through Knowledge to Wisdom</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-yellow-300 transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300 transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
