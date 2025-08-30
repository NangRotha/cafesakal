import React from 'react';

const QRCodeGenerator = ({ amount, image, size = 200 }) => {
  return (
    <div className="flex flex-col items-center">
      {image && (
        <div className="flex items-center mb-4">
          <img src={image} alt="Merchant" className="w-12 h-12 rounded-full mr-4" />
          <p className="text-sm font-semibold text-gray-700">Pay to Cafe Sakal</p>
        </div>
      )}
      <div className="mb-3 text-center">
        <p className="text-xl font-bold text-green-600">Total Amount: ${amount}</p>
      </div>
      <div 
        className="bg-white border-4 border-gray-300 rounded-lg p-4"
        style={{ width: size + 32, height: size + 32 }}
      >
        <img 
          src="/images/qr-payment.png"  
          alt="Payment QR Code" 
          className="w-full h-full object-contain"
          style={{ width: size, height: size }}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-gray-700">Payment QR Code</p>
        <p className="text-xs text-gray-500">Amount: ${amount}</p>
        <p className="text-xs text-gray-400 mt-1">Scan with your mobile payment app</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;