import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic (e.g., console log for demo)
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate__animated animate__fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600 mb-3 sm:mb-4 md:mb-6 font-['Hanuman']">
            ទាក់ទងមកកាន់ការហ្វេសាកល CafeSakal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-['Hanuman']">
            យើងរង់ចាំអ្នកពីCafeSakal។
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-md p-6 animate__animated animate__fadeInUp">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-['Hanuman']">
              ព័ត៌មានទាក់ទង
            </h2>
            <ul className="space-y-4 text-sm sm:text-base md:text-lg text-gray-600 font-['Hanuman']">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <span>ផផ្លូវជាតិលេខ៨ ភូមិថ្នល់កែង ឃុំស្មោងជើង ស្រុកកំចាយមារ ខេត្តព្រៃវែង ប្រទេសកម្ពុជា។</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+85512345678" aria-label="ទូរស័ព្ទទំនាក់ទំនង">+855 12 345 678</a>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@cafesakal.com" aria-label="អ៊ីមែលទំនាក់ទំនង">info@cafesakal.com</a>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/cafesakal" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
                  <a href="https://instagram.com/cafesakal" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Google Map and Contact Form */}
          <div className="space-y-6">
            {/* Google Map */}
            <div className="bg-white rounded-lg shadow-md p-6 animate__animated animate__fadeInUp animate__delay-0.2s">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-['Hanuman']">
                ទីតាំងរបស់យើង
              </h2>
              <div className="w-full h-80 sm:h-96 md:h-[28rem] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7134380679418!2d105.65748769999999!3d11.5723889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b86ece26c69dd%3A0x1d6d525716c4ba97!2z4Z6f4Z624Z6A4Z6b4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6b4Z-Q4Z6Z4Z6H4Z624Z6P4Z634Z6H4Z624Z6f4Z-K4Z644Z6Y4Z6A4Z-G4Z6F4Z624Z6Z4Z6Y4Z624Z6a!5e0!3m2!1skm!2skh!4v1753591726172!5m2!1skm!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="CafeSakal Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 animate__animated animate__fadeInUp animate__delay-0.4s">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-['Hanuman']">
                ផ្ញើសារមកយើង
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 font-['Hanuman']">
                    ឈ្មោះ
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm font-['Hanuman']"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 font-['Hanuman']">
                    អ៊ីមែល
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm font-['Hanuman']"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 font-['Hanuman']">
                    សារ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm font-['Hanuman']"
                    aria-required="true"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:animate__pulse text-sm sm:text-base font-['Hanuman']"
                  aria-label="ផ្ញើសារ"
                >
                  ផ្ញើសារ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;