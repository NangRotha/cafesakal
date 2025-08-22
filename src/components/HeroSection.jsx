import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // Define an array of slides with optimized Starbucks-themed images and Khmer text
  const slides = [
    {
      id: 1,
      image: './images/slide1.jpg',
      imageLarge: './images/slide1.jpg',
      headingKh: 'រសជាតិដ៏អស្ចារ្យចាប់ផ្តើមនៅទីនេះ',
      paragraphKh: 'ស្វែងរកភេសជ្ជៈកាហ្វេដ៏ល្អឥតខ្ចោះរបស់អ្នក ធ្វើឡើងដោយចិត្តស្រឡាញ់នៅការហ្វេសាកលCafeSakal'
    },
    {
      id: 2,
      image: './images/slide2.jpg',
      imageLarge: './images/slide2.jpg',
      headingKh: 'រីករាយជាមួយភាពកក់ក្តៅនៃកាហ្វេ',
      paragraphKh: 'ចូលមកសម្រាក និងរីករាយជាមួយបរិយាកាសដ៏កក់ក្តៅជាមួយនឹងភេសជ្ជៈរបស់អ្នក។'
    },
    {
      id: 3,
      image: './images/background.png',
      imageLarge: './images/background.png',
      headingKh: 'គ្រប់ពែងគឺជារឿងរ៉ាវមួយ',
      paragraphKh: 'ចែករំលែកគ្រាដ៏ពិសេសជាមួយកាហ្វេដែលផលិតដោយគុណភាពខ្ពស់។'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slides.length]);

  return (
    <section id="home" className="mt-16 relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center p-2 sm:p-4 md:p-6 rounded-b-xl overflow-hidden">
      {/* Background Image with transition */}
      <div className="absolute inset-0 bg-gray-200">
        <img
          src={slides[currentSlide].image}
          srcSet={`${slides[currentSlide].image} 600w, ${slides[currentSlide].imageLarge} 1200w`}
          sizes="(max-width: 868px) 600px, 1200px"
          alt="Starbucks coffee background"
          className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-60 sm:opacity-50 rounded-b-xl"></div>

      {/* Slide Content */}
      <div className="relative z-10 text-white max-w-3xl mx-auto p-3 sm:p-4 md:p-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 sm:mb-4 md:mb-6 drop-shadow-lg font-['Noto_Sans_Khmer']">
          {slides[currentSlide].headingKh}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-4 sm:mb-6 md:mb-8 font-['Noto_Sans_Khmer']">
          {slides[currentSlide].paragraphKh}
        </p>
        <Link
          to="/menu"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 text-sm sm:text-base md:text-lg font-['Noto_Sans_Khmer'] min-w-[44px] min-h-[44px]"
        >
          ស្វែងរកភេសជ្ជៈរបស់អ្នក
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentSlide ? 'bg-green-600' : 'bg-gray-400 bg-opacity-75'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`ទៅកាន់រូបភាព ${index + 1}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;