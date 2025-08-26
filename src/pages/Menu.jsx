import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import OrderForm from '../components/OrderForm'; // Import the OrderForm component

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    fetch('https://nangrotha.github.io/host_api/menuItems.json')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error fetching menu items:', error);
        setAlertMessage('Failed to load menu items.');
        setAlertType('error');
      });
  };

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
    setTimeout(() => setAlertMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleOrderError = (message) => {
    setAlertMessage(message);
    setAlertType('error');
    setTimeout(() => setAlertMessage(''), 5000); // Clear message after 5 seconds
  };

  return (
    <section id="featured" className="mt-16 py-12 bg-gray-100 relative">
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
          ស្វែងរកភេសជ្ជៈ និងអាហារពេញនិយម
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-14 mt-10 mb-5">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onOrder={() => handleOrderClick(item)}
            />
          ))}
        </div>
      </div>
      {showOrderForm && selectedMenuItem && (
        <OrderForm
          menuItem={selectedMenuItem}
          onClose={handleCloseOrderForm}
          onOrderSuccess={handleOrderSuccess}
          onOrderError={handleOrderError}
        />
      )}
    </section>
  );
};

export default MenuPage;