import React, { useState, useContext } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Payment = ({ showPopup, onClose, carts }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 

  const { url, token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
  
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.phone) {
      alert('Please fill all address fields');
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    try {
      setLoading(true);

      
      const items = carts.map(cart => ({
        product: cart.product._id,
        size: cart.size,
        quantity: cart.quantity
      }));

     
      const response = await axios.post(
        `${url}order`,
        {
          items,
          shippingAddress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        alert(`Order placed successfully! Payment method: ${paymentMethod}`);
        onClose();
        navigate('/orders'); 
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
      
    }
  };

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto'>
        <IoCloseCircleSharp
          onClick={onClose}
          className='absolute top-2 right-2 w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer'
        />

        {step === 1 ? (
          <>
            <h2 className='text-xl font-semibold mb-4'>Shipping Address</h2>
            <div className='flex flex-col gap-3'>
              <input
                type='text'
                name='fullName'
                placeholder='Full Name'
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input
                type='text'
                name='phone'
                placeholder='Phone Number'
                value={shippingAddress.phone}
                onChange={handleAddressChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <textarea
                name='address'
                placeholder='Street Address'
                value={shippingAddress.address}
                onChange={handleAddressChange}
                rows={3}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input
                type='text'
                name='city'
                placeholder='City'
                value={shippingAddress.city}
                onChange={handleAddressChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input
                type='text'
                name='postalCode'
                placeholder='Postal Code'
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input
                type='text'
                name='country'
                placeholder='Country'
                value={shippingAddress.country}
                onChange={handleAddressChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              onClick={handleNextStep}
              className='mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
            >
              Continue to Payment
            </button>
          </>
        ) : (
          <>
            <h2 className='text-xl font-semibold mb-4'>Choose Payment Method</h2>
            <div className='flex flex-col gap-3'>
              <label className='flex items-center gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50'>
                <input
                  type='radio'
                  name='payment'
                  value='Cash on Delivery'
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <label className='flex items-center gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50'>
                <input
                  type='radio'
                  name='payment'
                  value='Net Banking'
                  checked={paymentMethod === 'Net Banking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Net Banking
              </label>
              <label className='flex items-center gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50'>
                <input
                  type='radio'
                  name='payment'
                  value='Google Pay'
                  checked={paymentMethod === 'Google Pay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Google Pay
              </label>
            </div>
            <div className='flex gap-2 mt-4'>
              <button
                onClick={() => setStep(1)}
                className='flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors'
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className='flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400'
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;