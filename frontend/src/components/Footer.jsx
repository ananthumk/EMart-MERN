import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { FaShoppingCart, FaTruck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-white sticky md:hidden border-t-1 border-gray-500 w-full h-[10vh] bottom-0 flex items-center justify-evenly'>
       <div onClick={() => navigate('/')} className='flex flex-col items-center gap-1 cursor-pointer'>
           <IoHomeSharp className='w-5 h-5 text-gray-500' />
           <p className='text-[13px] font-medium text-center'>Home</p>
       </div>
       <div onClick={() => navigate('/product')} className='flex flex-col items-center gap-1 cursor-pointer'>
           <GiShoppingBag className='w-5 h-5 text-gray-500' />
           <p className='text-[13px] font-medium text-center'>Products</p>
       </div>
       <div onClick={() => navigate('/cart')} className='flex flex-col items-center  gap-1 cursor-pointer'>
           <FaShoppingCart className='w-5 h-5 text-gray-500' />
           <p className='text-[13px] font-medium text-center'>Cart</p>
       </div>
       <div onClick={() => navigate('/orders')} className='flex flex-col items-center gap-1 cursor-pointer'>
           <FaTruck className='w-5 h-5 text-gray-500' />
           <p className='text-[13px] font-medium text-center'>Orders</p>
       </div>
    </div>
  )
}

export default Footer
