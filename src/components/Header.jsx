import React, { useState } from 'react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200"
  >
    {children}
  </a>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-20 w-auto"
              src="./images/logo_coffee.png"
              alt="Starbucks Logo"
            />
            <span className="text-lg sm:text-xl font-bold text-brown-600 font-['Noto_Sans_Khmer']">
              CafeSakal
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <NavLink href="#">ម៉ឺនុយ</NavLink>
            <NavLink href="#">ភេសជ្ជៈ</NavLink>
            <NavLink href="#">អាហារ</NavLink>
            <NavLink href="#">ហាង</NavLink>
            <NavLink href="#">អំពីយើង</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex sm:items-center">
            <a
              href="#"
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200"
            >
              ចូលរួមឥឡូវនេះ
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-green-600 focus:outline-none p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          <MobileNavLink href="#">ម៉ឺនុយ</MobileNavLink>
          <MobileNavLink href="#">ភេសជ្ជៈ</MobileNavLink>
          <MobileNavLink href="#">អាហារ</MobileNavLink>
          <MobileNavLink href="#">ហាង</MobileNavLink>
          <MobileNavLink href="#">អំពីយើង</MobileNavLink>
          <a
            href="#"
            className="block px-4 py-2 text-base font-medium bg-green-600 text-white rounded-full mx-3 hover:bg-green-700 transition-colors duration-200"
          >
            ចូលរួមឥឡូវនេះ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;