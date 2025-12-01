import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import { Oval } from 'react-loader-spinner'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}order`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };


  if (!token) {
    return (
      <div>
        <Header />
        <div className='flex flex-col justify-center items-center min-h-[80vh]'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Please Login</h2>
          <p className='text-gray-600 mb-6'>You need to login to view your orders</p>
          <Link to='/login'>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold'>
              Login Now
            </button>
          </Link>
        </div>
      </div>
    );
  }

  
  if (loading) {
    return (
      <div>
        <Header />
        <div className='flex justify-center items-center min-h-[80vh]'>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="loading"
          />
        </div>
      </div>
    );
  }

  
  if (orders.length === 0) {
    return (
      <div>
        <Header />
        <div className='flex flex-col justify-center items-center min-h-[80vh]'>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png'
            alt='no orders'
            className='w-64 h-64 object-contain'
          />
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>No Orders Yet</h2>
          <p className='text-gray-600 mb-6'>Looks like you haven't placed any orders</p>
          <Link to='/products'>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold'>
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='w-[89%] mx-auto py-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-6'>My Orders</h1>
        <p className='text-gray-600 mb-8'>{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
        <div className='flex flex-col gap-6'>
          {orders.map((order) => (
            <div
              key={order._id}
              className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden'
            >
            
              <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Order ID: <span className='font-mono text-gray-800'>{order._id}</span></p>
                    <p className='text-sm text-gray-600'>Placed on: <span className='font-medium text-gray-800'>{formatDate(order.orderDate)}</span></p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className='text-xl font-bold text-blue-600'>₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
             
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Order Items</h3>
                <div className='flex flex-col gap-4'>
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'
                    >
                      <img
                        src={item.product.image}
                        alt={item.name}
                        className='w-16 h-16 md:w-20 md:h-20 rounded-md object-cover'
                      />
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-800'>{item.name}</h4>
                        <p className='text-sm text-gray-600'>Size: {item.size} | Qty: {item.quantity}</p>
                        <p className='text-sm font-medium text-gray-800'>₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {order.shippingAddress && (
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3'>Shipping Address</h3>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <p className='font-medium text-gray-800'>{order.shippingAddress.fullName}</p>
                    <p className='text-gray-600'>{order.shippingAddress.address}</p>
                    <p className='text-gray-600'>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p className='text-gray-600'>{order.shippingAddress.country}</p>
                    <p className='text-gray-600'>Phone: {order.shippingAddress.phone}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
