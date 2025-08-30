import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import OrderForm from '../components/OrderForm';
import ShoppingCart from '../components/ShoppingCart';
import { endpoints } from '../api/apiConfig';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  // const [alertMessage, setAlertMessage] = useState('');
  // const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetchMenuItems();
    // Request notification permission when component mounts
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const fetchMenuItems = () => {
    fetch(endpoints.menuItems)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error fetching menu items:', error);
        // setAlertMessage('Failed to load menu items.'); // No longer needed for in-component alert
        // setAlertType('error'); // No longer needed for in-component alert
        if (Notification.permission === 'granted') {
          new Notification('Menu Load Error', {
            body: 'Failed to load menu items.',
            icon: '/cafe_sakal_logo.png', // Replace with your logo path
          });
        }
      });
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    if (Notification.permission === 'granted') {
      new Notification('Item Added', {
        body: `${item.name} បានបន្ថែមទៅកន្ត្រកទិញ`,
        icon: '/cafe_sakal_logo.png',
      });
    }
  };

  const handleUpdateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleProceedToOrder = () => {
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setCartItems([]);
  };

  const handleOrderSuccess = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('Order Status', {
        body: message,
        icon: '/cafe_sakal_logo.png',
      });
    }
    handleCloseOrderForm();
  };

  const handleOrderError = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('Order Status', {
        body: message,
        icon: '/cafe_sakal_logo.png', // Replace with your logo path
      });
    }
  };

  return (
    <section id="featured" className="mt-16 py-12 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Remove the in-component alert display */}
        {/* {alertMessage && (
          <div
            className={`mb-4 p-3 rounded-md text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} animate__animated animate__fadeInUp`}
            role="alert"
          >
            {alertMessage}
          </div>
        )} */}

        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 font-['Hanuman'] animate__animated animate__fadeIn flex-1">
            ស្វែងរកភេសជ្ជៈ និងអាហារពេញនិយម
          </h2>
          
          {/* Cart Button */}
          <button
            onClick={handleShowCart}
            className="relative bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-14 mt-10 mb-5">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      {showCart && (
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClose={handleCloseCart}
          onProceedToOrder={handleProceedToOrder}
        />
      )}
      
      {showOrderForm && cartItems.length > 0 && (
        <OrderForm
          cartItems={cartItems}
          onClose={handleCloseOrderForm}
          onOrderSuccess={handleOrderSuccess}
          onOrderError={handleOrderError}
        />
      )}
    </section>
  );
};

export default MenuPage;