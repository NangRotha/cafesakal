import React, { useState } from 'react';

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-8 rounded-full mr-3" 
                src="/images/logo_coffee.png" 
                alt="Cafe Sakal Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div 
                className="h-8 w-8 bg-white rounded-full mr-3 flex items-center justify-center text-blue-600 font-bold"
                style={{display: 'none'}}
              >
                CS
              </div>
              <h1 className="text-white text-xl font-bold font-['Noto_Sans_Khmer']">
                ផ្ទាំងគ្រប់គ្រង Cafe Sakal
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              <a 
                href="/" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium font-['Noto_Sans_Khmer'] transition duration-300 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>ទំព័រដើម</span>
              </a>
              <button 
                onClick={() => scrollToSection('menu-section')}
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium font-['Noto_Sans_Khmer'] transition duration-300"
              >
                បញ្ជីមុខម្ហូប
              </button>
              <button 
                onClick={() => scrollToSection('orders-section')}
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium font-['Noto_Sans_Khmer'] transition duration-300"
              >
                ការកម្ម៉ង់
              </button>
              <button 
                onClick={() => scrollToSection('discounts-section')}
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium font-['Noto_Sans_Khmer'] transition duration-300"
              >
                ការបញ្ចុះតម្លៃ
              </button>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">A</span>
                </div>
                <span className="text-white text-sm font-medium font-['Noto_Sans_Khmer']">
                  អ្នកគ្រប់គ្រង
                </span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700">
            <a 
              href="/" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white block px-3 py-2 rounded-md text-base font-medium font-['Noto_Sans_Khmer'] transition duration-300 flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>ទំព័រដើម</span>
            </a>
            <button 
              onClick={() => scrollToSection('menu-section')}
              className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium font-['Noto_Sans_Khmer'] transition duration-300 w-full text-left"
            >
              បញ្ជីមុខម្ហូប
            </button>
            <button 
              onClick={() => scrollToSection('orders-section')}
              className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium font-['Noto_Sans_Khmer'] transition duration-300 w-full text-left"
            >
              ការកម្ម៉ង់
            </button>
            <button 
              onClick={() => scrollToSection('discounts-section')}
              className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium font-['Noto_Sans_Khmer'] transition duration-300 w-full text-left"
            >
              ការបញ្ចុះតម្លៃ
            </button>
            <div className="flex items-center space-x-2 px-3 py-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">A</span>
              </div>
              <span className="text-white text-sm font-medium font-['Noto_Sans_Khmer']">
                អ្នកគ្រប់គ្រង
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
