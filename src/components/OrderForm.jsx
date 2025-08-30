import React, { useState, useEffect } from 'react';
import { endpoints } from '../api/apiConfig';
import QRCodeGenerator from './QRCodeGenerator';

const OrderForm = ({ cartItems, onClose, onOrderSuccess, onOrderError }) => {
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(''); // New state for location
  const [customerPhone, setCustomerPhone] = useState(''); // New state for customer phone
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [availableDiscounts, setAvailableDiscounts] = useState([]); // New state for discounts
  const [appliedDiscountName, setAppliedDiscountName] = useState(''); // New state for applied discount name
  const [showPayment, setShowPayment] = useState(false); // New state for payment step
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); // New state for payment confirmation
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // New state for success alert

  useEffect(() => {
    // const today = new Date();
    // const day = today.getDay(); // Sunday - 0, Saturday - 6
    // setIsWeekend(day === 0 || day === 6); // No longer needed

    fetchDiscounts();
  }, []);

  useEffect(() => {
    calculateEventDiscount();
  }, [cartItems, availableDiscounts]);

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

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('៛', '').replace(',', '')) || parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateEventDiscount = () => {
    let newDiscount = 0;
    let discountName = '';
    const now = new Date();
    const totalBeforeDiscount = calculateCartTotal();

    availableDiscounts.forEach(discount => {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);

      // Only apply "កម្មង់" (order) discount, not "ទិញផ្ទាល់" (direct purchase) discount
      if (now >= startDate && now <= endDate && discount.name === 'កម្មង់') {
        let currentDiscountValue = 0;
        if (discount.type === 'percentage') {
          currentDiscountValue = totalBeforeDiscount * (discount.value / 100);
        } else if (discount.type === 'fixed') {
          currentDiscountValue = discount.value;
        }

        // Apply the discount if it's for orders
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
    if (!showPayment) {
      setShowPayment(true);
      return;
    }

    if (!paymentConfirmed) {
      alert('សូមបញ្ជាក់ការទូទាត់របស់អ្នកមុនពេលកុម្ម៉ង់។');
      return;
    }

    setLoading(true);

    const orderData = {
      items: cartItems.map(item => ({
        menuItemId: item.id,
        menuItemName: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.replace('៛', '').replace(',', '')) || parseFloat(item.price)
      })),
      customerName,
      notes,
      location,
      customerPhone,
      orderDate: new Date().toISOString(),
      discountApplied: discountAmount > 0,
      discountAmount: discountAmount,
      appliedDiscountName: appliedDiscountName,
      subtotal: calculateCartTotal(),
      finalPrice: calculateCartTotal() - discountAmount,
      paymentStatus: 'paid',
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
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          onOrderSuccess('កុម្ម៉ង់បានដាក់ដោយជោគជ័យ!');
          onClose();
        }, 2000);
      } else {
        onOrderError('មិនអាចដាក់កុម្ម៉ង់បានទេ។ សូមព្យាយាមម្តងទៀត។');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      onOrderError('មានបញ្ហាកើតឡើង។ សូមពិនិត្យការតភ្ជាប់របស់អ្នក។');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowPayment(false);
    setPaymentConfirmed(false);
  };

  const handlePaymentConfirm = () => {
    setPaymentConfirmed(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate__animated animate__zoomIn overflow-y-auto max-h-[80vh]">
        {showSuccessAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-8 text-center animate__animated animate__bounceIn">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">កុម្ម៉ង់ជោគជ័យ!</h3>
              <p className="text-gray-600">កុម្ម៉ង់របស់អ្នកត្រូវបានដាក់ដោយជោគជ័យ។</p>
            </div>
          </div>
        )}
        
        {!showPayment ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">បញ្ជាក់កុម្ម៉ង់</h2>
            
            {/* Cart Items Summary */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">ផលិតផលដែលបានកុម្ម៉ង់:</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">បរិមាណ: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">
                      ${((parseFloat(item.price.replace('៛', '').replace(',', '')) || parseFloat(item.price)) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">ឈ្មោះរបស់អ្នក:</label>
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
            <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-bold mb-2">លេខទូរស័ព្ទ:</label>
            <input
              type="tel"
              id="customerPhone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">កំណត់ចំណាំពិសេស (ស្រេចចិត្ត):</label>
            <textarea
              id="notes"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">ទីតាំងដឹកជញ្ជូន:</label>
            <input
              type="text"
              id="location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-bold text-gray-800">តម្លៃដើម: ${calculateCartTotal().toFixed(2)}</p>
            {discountAmount > 0 && (
              <p className="text-red-500 font-semibold">បញ្ចុះតម្លៃ: -${discountAmount.toFixed(2)} ({appliedDiscountName})</p>
            )}
            <p className="text-xl font-extrabold text-green-600">តម្លៃចុងក្រោយ: ${(calculateCartTotal() - discountAmount).toFixed(2)}</p>
          </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                  disabled={loading}
                >
                  បន្តទៅការទូទាត់
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                  disabled={loading}
                >
                  បោះបង់
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ការទូទាត់</h2>
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                សរុបចំនួនទឹកប្រាក់: ${(calculateCartTotal() - discountAmount).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ស្កេន QR កូដខាងក្រោមដើម្បីធ្វើការទូទាត់:
              </p>
              <div className="flex justify-center mb-4">
                <QRCodeGenerator 
                  amount={(calculateCartTotal() - discountAmount).toFixed(2)}
                  size={192}
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={handlePaymentConfirm}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">ខ្ញុំបានបញ្ចប់ការទូទាត់</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBackToForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
              >
                ត្រលប់
              </button>
              <button
                onClick={handleSubmit}
                className={`font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ${
                  paymentConfirmed 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!paymentConfirmed || loading}
              >
                {loading ? 'កំពុងដាក់កុម្ម៉ង់...' : 'បញ្ជាក់កុម្ម៉ង់'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
