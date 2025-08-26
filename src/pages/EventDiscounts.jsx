import React, { useState, useEffect } from 'react';
import { endpoints } from '../api/apiConfig';

const EventDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(endpoints.discounts);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDiscounts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading discounts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 ​mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.length > 0 ? (
          discounts.map(discount => (
            <div key={discount.id} className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-xl p-6 transform hover:scale-105 transition duration-300 relative overflow-hidden">
              {discount.active && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Active</span>
              )}
              <h2 className="text-2xl font-bold text-green-800 mb-3">{discount.name}</h2>
              <p className="text-gray-700 text-lg mb-2">Type: <span className="font-semibold text-green-700">{discount.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</span></p>
              <p className="text-4xl font-extrabold text-green-600 mb-4">
                {discount.type === 'percentage' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
              </p>
              <p className="text-gray-600 text-sm">Valid From: <span className="font-medium">{new Date(discount.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
              <p className="text-gray-600 text-sm">Until: <span className="font-medium">{new Date(discount.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
              {!discount.active && (
                <p className="mt-4 text-sm font-semibold text-red-600">This discount is currently inactive.</p>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-10 text-xl">No exciting discounts available at the moment. Check back soon!</div>
        )}
      </div>
    </div>
  );
};

export default EventDiscounts;
