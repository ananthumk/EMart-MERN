import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import { IoSearchSharp } from "react-icons/io5";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import axios from 'axios';
import Card from '../components/Card';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import { Oval } from 'react-loader-spinner'; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    search: '', category: '', size: '', minPrice: '', maxPrice: '', limit: 12
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { url, token } = useContext(AppContext);

  useEffect(() => {
    if (!token) return;
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${url}product/?category=${filter.category}&size=${filter.size}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&page=${currentPage}&limit=${filter.limit}&search=${filter.search}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200 || response.status === 201) {
          setProducts(response.data.products);
          setTotalPages(response.data.pages);
        }
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [url, token, filter, currentPage]);

  const handlefilter = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const decrementPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(prev => prev - 1);
  };

  const incrementPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(prev => prev + 1);
  };

  const clearFilter = () => {
    setFilter({
      search: '', category: '', size: '', minPrice: '', maxPrice: '', limit: 12
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 w-[85%] mx-auto pt-8">
        <div className="py-3 px-4 bg-white shadow-md rounded border-1 border-gray-300">
          <div className="flex flex-col gap-3 py-1">
            <div className="flex justify-evenly items-center flex-wrap gap-5">
              <div className="flex w-[300px] items-center gap-2 py-0.5 px-1.5 border-1 rounded-md border-gray-300">
                <IoSearchSharp className="w-4 h-4" />
                <input
                  type="search"
                  value={filter.search}
                  name="search"
                  onChange={handlefilter}
                  placeholder="search by name and description"
                  className="text-[13px] text-gray-600 border-0 outline-0 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold">CATEGORY</label>
                <select
                  value={filter.category}
                  name="category"
                  onChange={handlefilter}
                  className="w-[160px] border-1 border-gray-300 rounded-sm text-[13px] outline text-gray-600 px-1.5"
                >
                  <option value="ALL">All</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold">SIZES</label>
                <select
                  value={filter.size}
                  name="size"
                  onChange={handlefilter}
                  className="w-[100px] border-1 border-gray-300 rounded-sm text-[13px] outline text-gray-600 px-1.5"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold">MIN PRICE</label>
                <input
                  type="number"
                  value={filter.minPrice}
                  name="minPrice"
                  onChange={handlefilter}
                  placeholder="0"
                  className="w-[80px] md:w-[200px] text-[13px] border-1 py=0.5 px-1.5 border-gray-300 outline-0 rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold">MAX PRICE</label>
                <input
                  type="number"
                  value={filter.maxPrice}
                  name="maxPrice"
                  onChange={handlefilter}
                  placeholder="0"
                  className="w-[80px] md:w-[200px] text-[13px] border-1 py=0.5 px-1.5 border-gray-300 outline-0 rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold">LIMIT</label>
                <input
                  type="number"
                  value={filter.limit}
                  name="limit"
                  onChange={handlefilter}
                  placeholder="0"
                  className="w-[50px] md:w-[100px] text-[13px] border-1 py=0.5 px-1.5 border-gray-300 outline-0 rounded-sm"
                />
              </div>
            </div>
            <p onClick={clearFilter} className="self-end text-[15px] cursor-pointer font-medium text-blue-500">Clear Filter</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              visible={true}
              ariaLabel="loading"
            />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="flex items-center overflow-auto gap-5 flex-wrap">
            {products?.map(product => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <p className="text-2xl text-gray-600">No Product Found</p>
          </div>
        )}

        <div className="flex mt-5 items-center gap-2 justify-center">
          <BiSolidLeftArrow onClick={decrementPage} className="w-5 h-5 cursor-pointer" />
          <p className="text-[20px] font-medium">{currentPage}</p>
          <BiSolidRightArrow onClick={incrementPage} className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
