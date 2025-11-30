import React, { useContext, useEffect, useState } from 'react'
import { RiAddBoxLine } from "react-icons/ri";
import { PiMinusSquareLight } from "react-icons/pi";
import { IoCloseCircleSharp } from "react-icons/io5";
import Header from '../components/Header'
import AppContext from '../context/AppContext'
import axios from 'axios'

const Cart = () => {
    const [carts, setCart] = useState([])
    const { url, token } = useContext(AppContext)
    useEffect(() => {
        if (!token) return
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${url}cart/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200 || response.status === 201) {
                    setCart(response.data.items)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCart()
    }, [url, token])


    return (
        <div>
            <Header />
            <div className='flex flex-col h-[90vh] pt-8 w-[85%] mx-auto gap-4'>
                <h1 className='text-4xl font-bold text-gray-700'>My Cart</h1>
                {carts.length > 0 ? <div className='flex flex-col gap-4'>
                    {carts.map(cart => (
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:px-6 md:py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100'>

                            {/* Product Info Section */}
                            <div className='flex items-center gap-3 md:gap-4 flex-1 min-w-0'>
                                {/* Product Image */}
                                <div className='flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100'>
                                    <img
                                        src={cart.product.image}
                                        alt={cart.product.name}
                                        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                                    />
                                </div>

                                {/* Product Details */}
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

                            {/* Quantity Controls */}
                            <div className='flex items-center gap-3 md:gap-4 bg-gray-50 px-3 py-2 rounded-lg'>
                                <PiMinusSquareLight className='w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors' />

                                <span className='text-base md:text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>
                                    {cart.quantity}
                                </span>

                                <RiAddBoxLine className='w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors' />
                            </div>

                            {/* Price and Remove Section */}
                            <div className='flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto'>
                                <div className='flex flex-col items-start md:items-end'>
                                    <span className='text-xs text-gray-500 font-medium'>Total</span>
                                    <h3 className='text-lg md:text-xl font-bold text-blue-600'>
                                        ₹{(cart.quantity * cart.product.price).toFixed(2)}
                                    </h3>
                                </div>

                                <IoCloseCircleSharp className='w-6 h-6 md:w-7 md:h-7 text-red-400 hover:text-red-600 cursor-pointer transition-colors' />
                            </div>
                        </div>
                    ))}
                </div> : <div className='flex justify-center w-full min-h-[300px] mb-12 items-center'>
                    <h2 className='text-2xl text-gray-500 font-medium'>
                        No Item Found
                    </h2>
                </div>}
            </div>
        </div>
    )
}

export default Cart
