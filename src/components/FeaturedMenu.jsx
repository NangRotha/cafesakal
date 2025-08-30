import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import ShoppingCart from './ShoppingCart';
import OrderForm from './OrderForm';
import { endpoints } from '../api/apiConfig';

const FeaturedMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetch(endpoints.menuItems)
      .then(response => response.json())
      .then(data => setMenuItems(data.slice(0, 6)))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

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
    setAlertMessage('បានបន្ថែមទៅកន្ត្រកទិញ!');
    setAlertType('success');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleProceedToOrder = () => {
    setShowCart(false);
    setShowOrderForm(true);
    setAlertMessage(''); // Clear any previous alerts
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
  };

  const handleOrderSuccess = (message) => {
    setAlertMessage(message);
    setAlertType('success');
    setCartItems([]); // Clear cart after successful order
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
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Cart Button */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setShowCart(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>{cartItems.length}</span>
            </button>
          </div>
        )}

        {/* Shopping Cart Modal */}
        {showCart && (
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClose={handleCloseCart}
            onProceedToOrder={handleProceedToOrder}
          />
        )}

        {/* Order Form Modal */}
        {showOrderForm && cartItems.length > 0 && (
          <OrderForm
            cartItems={cartItems}
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
