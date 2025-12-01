import React, { useContext, useEffect, useState } from 'react';
import { RiAddBoxLine } from "react-icons/ri";
import { PiMinusSquareLight } from "react-icons/pi";
import { IoCloseCircleSharp } from "react-icons/io5";
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import axios from 'axios';
import Payment from '../components/Payment';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Oval } from 'react-loader-spinner'; 

const Cart = () => {
  const [carts, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetchCart();
  }, [url, token]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        setCart(response.data.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async (productId, size, currentQuantity) => {
    try {
      const response = await axios.put(
        `${url}cart/update`,
        {
          productId,
          size,
          quantity: currentQuantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCart(response.data.items);
      }
    } catch (error) {
      console.log('Update error:', error);
    }
  };

  const handleDecrement = async (productId, size, currentQuantity) => {
    if (currentQuantity <= 1) return;
    try {
      const response = await axios.put(
        `${url}cart/update`,
        {
          productId,
          size,
          quantity: currentQuantity - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCart(response.data.items);
      }
    } catch (error) {
      console.log('Update error:', error);
    }
  };

  const handleRemove = async (productId, size) => {
    try {
      const response = await axios.delete(`${url}cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId,
          size,
        },
      });
      if (response.status === 200) {
        setCart(response.data.cart.items);
      }
    } catch (error) {
      console.log('Remove error:', error);
    }
  };

  useEffect(() => {
    const total = carts.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setTotalPrice(total);
  }, [carts]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className='flex justify-center items-center min-h-[80vh]'>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className='flex flex-col min-h-[90vh] pt-8 w-[85%] mx-auto gap-4'>
          <h1 className='text-4xl font-bold text-gray-700'>My Cart</h1>
          {carts.length > 0 ? (
            <>
              <div className='flex flex-col gap-4'>
                {carts.map((cart) => (
                  <div
                    key={`${cart.product._id}-${cart.size}`}
                    className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:px-6 md:py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100'
                  >
                    <div className='flex items-center gap-3 md:gap-4 flex-1 min-w-0'>
                      <div className='flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100'>
                        <img
                          src={cart.product.image}
                          alt={cart.product.name}
                          className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                        />
                      </div>
                      <div className='flex flex-col justify-center gap-1.5 min-w-0 flex-1'>
                        <h3 className='text-sm md:text-base font-semibold text-gray-800 truncate'>
                          {cart.product.name}
                        </h3>
                        <p className='text-xs text-gray-500 font-medium'>
                          {cart.product.category}
                        </p>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium'>
                            Size: {cart.size}
                          </span>
                          <span className='text-xs text-gray-400'>
                            ₹{cart.product.price} each
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 md:gap-4 bg-gray-50 px-3 py-2 rounded-lg'>
                      <PiMinusSquareLight
                        onClick={() => handleDecrement(cart.product._id, cart.size, cart.quantity)}
                        className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors ${
                          cart.quantity <= 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      />
                      <span className='text-base md:text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>
                        {cart.quantity}
                      </span>
                      <RiAddBoxLine
                        onClick={() => handleIncrement(cart.product._id, cart.size, cart.quantity)}
                        className='w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'
                      />
                    </div>
                    <div className='flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto'>
                      <div className='flex flex-col items-start md:items-end'>
                        <span className='text-xs text-gray-500 font-medium'>Total</span>
                        <h3 className='text-lg md:text-xl font-bold text-blue-600'>
                          ₹{(cart.quantity * cart.product.price).toFixed(2)}
                        </h3>
                      </div>
                      <IoCloseCircleSharp
                        onClick={() => handleRemove(cart.product._id, cart.size)}
                        className='w-6 h-6 md:w-7 md:h-7 text-red-400 hover:text-red-600 cursor-pointer transition-colors'
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className='bg-white rounded-lg shadow-md p-6 mt-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-2xl font-bold text-gray-800'>Cart Total</h2>
                  <h2 className='text-2xl font-bold text-blue-600'>₹{totalPrice.toFixed(2)}</h2>
                </div>
                <button
                  onClick={() => setShowPaymentPopup(true)}
                  className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <div className='flex flex-col gap-3 justify-center w-full min-h-[300px] mb-12 items-center'>
              <h2 className='text-2xl text-gray-500 font-medium'>No Item Found</h2>
              <button onClick={() => navigate('/product')} className='w-[180px] cursor-pointer py-1 rounded bg-blue-500 text-white font-medium text-lg'>
                Shop Now
              </button>
            </div>
          )}
          <Payment showPopup={showPaymentPopup} onClose={() => setShowPaymentPopup(false)} carts={carts} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
