// src/components/MenuItem.js
import React from 'react';

const MenuItem = ({ title, description, items, credits }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
      <h4 className="text-3xl font-semibold text-indigo-700 mb-4">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <span className="text-blue-600 font-bold text-2xl">Credits: {credits} Beans</span>
    </div>
  );
};

export default MenuItem;
