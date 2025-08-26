import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrderForm from './OrderForm'; // Import the OrderForm component
import { endpoints } from '../api/apiConfig';

const FeaturedMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetch(endpoints.menuItems)
      .then(response => response.json())
      .then(data => setMenuItems(data.slice(0, 6)))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleOrderClick = (item) => {
    setSelectedMenuItem(item);
    setShowOrderForm(true);
    setAlertMessage(''); // Clear any previous alerts
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedMenuItem(null);
  };

  const handleOrderSuccess = (message) => {
    setAlertMessage(message);
    setAlertType('success');
    handleCloseOrderForm();
  };

  const handleOrderError = (message) => {
    setAlertMessage(message);
    setAlertType('error');
  };

  return (
    <section id="featured" className="mt-16 py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {alertMessage && (
          <div
            className={`mb-4 p-3 rounded-md text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} animate__animated animate__fadeInUp`}
            role="alert"
          >
            {alertMessage}
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-8 sm:mb-12 font-['Hanuman'] animate__animated animate__fadeIn">
          ភេសជ្ជៈពេញនិយម
        </h2>

        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onOrder={() => handleOrderClick(item)} // Pass handleOrderClick to MenuItem
            />
          ))}
        </div>

        {showOrderForm && selectedMenuItem && (
          <OrderForm
            menuItem={selectedMenuItem}
            onClose={handleCloseOrderForm}
            onOrderSuccess={handleOrderSuccess}
            onOrderError={handleOrderError}
          />
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/menu"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg md:text-xl font-['Hanuman'] min-w-[44px] min-h-[44px] animate__animated animate__fadeIn"
            aria-label="មើលម៉ឺនុយបន្ថែម"
          >
            មើលម៉ឺនុយបន្ថែម
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
