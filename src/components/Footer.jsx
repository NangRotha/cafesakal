import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Information */}
          <div className="animate__animated animate__fadeInUp">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 font-['Hanuman']">
              ទាក់ទងមកយើង
            </h3>
            <ul className="space-y-3 text-sm sm:text-base font-['Hanuman']">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <span>ផផ្លូវជាតិលេខ៨ ភូមិថ្នល់កែង ឃុំស្មោងជើង ស្រុកកំចាយមារ ខេត្តព្រៃវែង ប្រទេសកម្ពុជា។</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+85512345678" aria-label="ទូរស័ព្ទទំនាក់ទំនង" className="hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse">
                  +855 12 345 678
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@cafesakal.com" aria-label="អ៊ីមែលទំនាក់ទំនង" className="hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse">
                  info@cafesakal.com
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="animate__animated animate__fadeInUp animate__delay-0.2s">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 font-['Hanuman']">
              តំណភ្ជាប់រហ័ស
            </h3>
            <nav className="space-y-3 text-sm sm:text-base font-['Hanuman']">
              <Link to="/" className="block hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse" aria-label="ទៅកាន់ទំព័រដើម">
                ទំព័រដើម
              </Link>
              <Link to="/about" className="block hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse" aria-label="ទៅកាន់ទំព័រអំពី">
                អំពី
              </Link>
              <Link to="/contact" className="block hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse" aria-label="ទៅកាន់ទំព័រទាក់ទង">
                ទាក់ទង
              </Link>
              <Link to="/menu" className="block hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse" aria-label="ទៅកាន់ទំព័រម៉ឺនុយ">
                ម៉ឺនុយ
              </Link>
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="animate__animated animate__fadeInUp animate__delay-0.4s">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 font-['Hanuman']">
              តាមដានយើង
            </h3>
            <div className="flex space-x-4 text-sm sm:text-base font-['Hanuman']">
              <a
                href="https://facebook.com/cafesakal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse"
                aria-label="តាមដាននៅលើ Facebook"
              >
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
                Facebook
              </a>
              <a
                href="https://instagram.com/cafesakal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-green-500 transition-colors duration-300 hover:animate__animated hover:animate__pulse"
                aria-label="តាមដាននៅលើ Instagram"
              >
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.33-2.633 1.305-3.608.975-.975 2.242-1.243 3.608-1.305 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.512.069-2.848.364-3.918 1.434C2.064 2.596 1.769 3.932 1.7 5.444c-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.069 1.512.364 2.848 1.434 3.918 1.07 1.07 2.406 1.365 3.918 1.434 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.512-.069 2.848-.364 3.918-1.434 1.07-1.07 1.365-2.406 1.434-3.918.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.069-1.512-.364-2.848-1.434-3.918-1.07-1.07-2.406-1.365-3.918-1.434-1.28-.058-1.688-.072-4.947-.072z"></path>
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"></path>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 sm:mt-10 text-center text-sm sm:text-base text-gray-300 font-['Hanuman'] animate__animated animate__fadeInUp animate__delay-0.6s">
          &copy; 2025 ការហ្វេសាកល CafeSakal. រក្សាសិទ្ធិគ្រប់យ៉ាង។
        </div>
      </div>
    </footer>
  );
};

export default Footer;