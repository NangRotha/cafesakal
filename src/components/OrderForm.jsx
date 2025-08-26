import React, { useState, useEffect } from 'react';
import { endpoints } from '../api/apiConfig';

const OrderForm = ({ menuItem, onClose, onOrderSuccess, onOrderError }) => {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(''); // New state for location
  const [customerPhone, setCustomerPhone] = useState(''); // New state for customer phone
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  // const [isWeekend, setIsWeekend] = useState(false); // No longer needed
  const [availableDiscounts, setAvailableDiscounts] = useState([]); // New state for discounts
  const [appliedDiscountName, setAppliedDiscountName] = useState(''); // New state for applied discount name

  useEffect(() => {
    // const today = new Date();
    // const day = today.getDay(); // Sunday - 0, Saturday - 6
    // setIsWeekend(day === 0 || day === 6); // No longer needed

    fetchDiscounts();
  }, []);

  useEffect(() => {
    calculateEventDiscount();
  }, [quantity, availableDiscounts]);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch(endpoints.discounts);
      if (!response.ok) {
        throw new Error('Failed to fetch discounts');
      }
      const data = await response.json();
      setAvailableDiscounts(data.filter(d => d.active)); // Filter for active discounts
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  };

  const calculateEventDiscount = () => {
    let newDiscount = 0;
    let discountName = '';
    const now = new Date();
    const itemPrice = parseFloat(menuItem.price);
    const totalBeforeDiscount = itemPrice * quantity;

    availableDiscounts.forEach(discount => {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);

      if (now >= startDate && now <= endDate) {
        let currentDiscountValue = 0;
        if (discount.type === 'percentage') {
          currentDiscountValue = totalBeforeDiscount * (discount.value / 100);
        } else if (discount.type === 'fixed') {
          currentDiscountValue = discount.value;
        }

        // Apply the highest discount
        if (currentDiscountValue > newDiscount) {
          newDiscount = currentDiscountValue;
          discountName = discount.name;
        }
      }
    });

    setDiscountAmount(newDiscount);
    setAppliedDiscountName(discountName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      customerName,
      quantity,
      notes,
      location, // Include location in order data
      customerPhone, // Include customer phone in order data
      orderDate: new Date().toISOString(),
      discountApplied: discountAmount > 0, // Indicate if a discount was applied
      discountAmount: discountAmount,
      appliedDiscountName: appliedDiscountName, // Include the name of the applied discount
      finalPrice: (parseFloat(menuItem.price) * quantity) - discountAmount,
    };

    try {
      const response = await fetch(endpoints.orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        onOrderSuccess('Order placed successfully!');
        onClose();
      } else {
        onOrderError('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      onOrderError('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate__animated animate__zoomIn overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order {menuItem.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Your Name:</label>
            <input
              type="text"
              id="customerName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="tel"
              id="customerPhone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">Special Notes (optional):</label>
            <textarea
              id="notes"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Delivery Location:</label>
            <input
              type="text"
              id="location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-4">
            <p className="text-lg font-bold text-gray-800">Original Price: ${ (parseFloat(menuItem.price) * quantity).toFixed(2) }</p>
            {discountAmount > 0 && (
              <p className="text-red-500 font-semibold">Discount: -${discountAmount.toFixed(2)} ({appliedDiscountName})</p>
            )}
            <p className="text-xl font-extrabold text-green-600">Final Price: ${((parseFloat(menuItem.price) * quantity) - discountAmount).toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Place Order'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
