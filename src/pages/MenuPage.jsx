// src/pages/MenuPage.js
import React from 'react';
import MenuItem from '../components/MenuItem'; // Import the MenuItem component
import { Coffee } from 'lucide-react';

const MenuPage = () => {
  const menuItems = [
    {
      title: "Espresso Fundamentals",
      description: "A foundational course exploring the science and art of perfect espresso extraction. Learn about grind size, tamping, and shot timing.",
      items: ["Single Origin Espresso", "Signature House Blend", "Decaf Espresso"],
      credits: "3"
    },
    {
      title: "Advanced Latte Art & Milk Chemistry",
      description: "Master the delicate techniques of milk steaming and pouring to create intricate latte art designs.",
      items: ["Latte (Classic, Vanilla, Caramel)", "Cappuccino", "Flat White"],
      credits: "4"
    },
    {
      title: "Global Coffee Cultures & Brewing Methods",
      description: "An immersive study into diverse coffee traditions and brewing methods from around the world.",
      items: ["Pour Over (V60, Chemex)", "Aeropress", "French Press"],
      credits: "3"
    },
    {
      title: "The Art of Cold Brew & Iced Beverages",
      description: "Explore the slow extraction process of cold brew and craft refreshing iced coffee concoctions.",
      items: ["Classic Cold Brew", "Iced Americano", "Iced Mocha"],
      credits: "2"
    },
    {
      title: "Pastry & Snack Electives",
      description: "Complement your coffee studies with our selection of freshly baked goods and savory snacks.",
      items: ["Croissants (Butter, Chocolate)", "Muffins (Blueberry, Chocolate Chip)", "Artisan Sandwiches"],
      credits: "1"
    },
    {
      title: "Specialty Tea Studies",
      description: "For those who prefer a different leaf, our curated selection of fine teas offers a tranquil alternative.",
      items: ["Green Tea (Matcha, Sencha)", "Black Tea (Earl Grey, English Breakfast)", "Herbal Infusions"],
      credits: "2"
    },
  ];

  return (
    <section id="menu" className="bg-blue-50 py-16 px-6 rounded-2xl mx-auto container shadow-xl">
      <h3 className="text-5xl font-bold text-center text-blue-800 mb-12">
        <Coffee className="inline-block w-12 h-12 mr-4 text-yellow-600" />
        Our Comprehensive Curriculum
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            description={item.description}
            items={item.items}
            credits={item.credits}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuPage;
