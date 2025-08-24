import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Removed custom NavLink and MobileNavLink components

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-20 w-auto"
                src="./images/logo_coffee.png"
                alt="Starbucks Logo"
              />
              <span className="text-lg sm:text-xl font-bold text-brown-600 font-['Noto_Sans_Khmer'] ml-2">
                CafeSakal
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8 flex-grow justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
              }
            >
              ទំព័រដើម
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
              }
            >
              ម៉ឺនុយ
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
              }
            >
              អំពីយើង
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
              }
            >
              ទំនាក់ទំនង
            </NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex sm:items-center">
            <NavLink
              to="/contact"
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200"
            >
              ចូលរួមឥឡូវនេះ
            </NavLink>
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
        <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 text-center">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
            }
            onClick={toggleMenu}
          >
            ម៉ឺនុយ
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
            }
            onClick={toggleMenu}
          >
            អំពីយើង
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
            }
            onClick={toggleMenu}
          >
            ទំនាក់ទំនង
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 ${isActive ? 'text-green-600' : ''}`
            }
            onClick={toggleMenu}
          >
            ទំព័រដើម
          </NavLink>
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-base font-medium bg-green-600 text-white rounded-full w-fit mx-auto hover:bg-green-700 transition-colors duration-200"
            onClick={toggleMenu}
          >
            ចូលរួមឥឡូវនេះ
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;