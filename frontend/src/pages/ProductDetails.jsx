import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import axios from 'axios';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Oval } from 'react-loader-spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { url, token } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${url}product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        setProduct(response.data);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    try {
      setAddingToCart(true);
      const response = await axios.post(
        `${url}cart/add`,
        {
          productId: id,
          size: selectedSize,
          quantity: quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        alert('Product added to cart successfully!');
        navigate('/cart'); 
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="loading"
          />
        </div>
      ) : error || !product ? (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <img
            alt="error view"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            className="w-[300px] h-[165px] md:w-[540px] md:h-[290px]"
          />
          <h1 className="text-[#1e293b] text-[32px] md:text-[48px] font-medium mt-12">
            Product Not Found
          </h1>
          <Link to="/products">
            <button
              type="button"
              className="text-white text-sm font-medium bg-[#3b82f6] border-none rounded px-5 py-3 mt-4 cursor-pointer"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-[90vh] justify-center mt-8 md:mt-16 px-4 md:px-0">
          <div className="w-full md:w-[85%] max-w-[1110px] mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between gap-8">
              <div className="md:w-1/2 flex-shrink-0">
                <img
                  src={product.image}
                  alt="product"
                  className="rounded-2xl w-full max-h-[476px] object-cover"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="text-[#3e4c59] text-2xl md:text-5xl font-medium mt-6 md:mt-0 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-[#171f46] text-2xl font-bold mb-4">
                    ₹{product.price}/-
                  </p>
                  <p className="text-[#616e7c] text-sm md:text-lg mt-4 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-[#171f46] text-base md:text-lg font-medium mb-2">
                      Select Size:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded transition-colors ${
                            selectedSize === size
                              ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-[#3b82f6]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex mb-4">
                    <p className="text-[#171f46] text-base md:text-lg font-medium m-0">
                      Category:
                    </p>
                    <p className="text-[#616e7c] text-base md:text-lg m-0 ml-2">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex mb-4">
                    <p className="text-[#171f46] text-base md:text-lg font-medium m-0">
                      Available:
                    </p>
                    <p className="text-[#616e7c] text-base md:text-lg m-0 ml-2">
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <hr className="border-t border-[#cbced2] m-0" />
                  <div className="flex items-center my-4">
                    <button
                      type="button"
                      className="bg-transparent border-none outline-none cursor-pointer"
                      onClick={handleDecrementQuantity}
                    >
                      <BsDashSquare className="text-[#616e7c] w-4 h-4" />
                    </button>
                    <p className="text-[#616e7c] text-xl md:text-2xl font-medium mx-6">
                      {quantity}
                    </p>
                    <button
                      type="button"
                      className="bg-transparent border-none outline-none cursor-pointer"
                      onClick={handleIncrementQuantity}
                    >
                      <BsPlusSquare className="text-[#616e7c] w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-white text-xs md:text-sm font-medium bg-[#3b82f6] border-none rounded px-5 py-3 outline-none cursor-pointer mb-8 md:mb-12 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                >
                  {addingToCart ? 'ADDING...' : product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
