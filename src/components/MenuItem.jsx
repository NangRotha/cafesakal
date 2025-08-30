// src/components/MenuItem.js
import React from 'react';

const MenuItem = ({ id, name, description, price, image, onAddToCart }) => {
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('៛')) {
      return price;
    }
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      description,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div>
        <img src={image} alt={name} className="h-80 w-full object-cover rounded-t-xl" />
        <div className="px-4 py-3 w-full">
          <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
          <p className="text-sm text-gray-600 truncate block capitalize">{description}</p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">{formatPrice(price)}</p>
            <div className="ml-auto">
              <button
                className="flex items-center justify-center p-2 rounded-full bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
