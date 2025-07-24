// src/components/ContactForm.js
import React from 'react';

const ContactForm = () => {
  return (
    <div className="bg-blue-50 p-8 rounded-xl shadow-md">
      <h4 className="text-3xl font-semibold text-indigo-700 mb-6">Inquiry Form</h4>
      <form className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Full Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your.email@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea id="message" rows="5" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us about your inquiry..."></textarea>
        </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
