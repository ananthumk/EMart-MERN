import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'

import { FiLogIn } from "react-icons/fi";

const Header = () => {
  const {updateToken} = useContext(AppContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    updateToken('')
    navigate('/login')
  }
  return (
    <div className='w-full flex px-5 md:px-40 justify-between items-center h-[10vh] border-b-2 bg-white border-b-gray-200'>
        <h1 onClick={() => navigate('/')} className='text-3xl font-bold text-blue-600'>E <span className='text-black'>Mart</span></h1>
        <div className='hidden md:flex  items-center gap-4'>
             <p onClick={() => navigate('/')} className='text-[16px] font-semibold cursor-pointer text-gray-400'>Home</p>
             <p onClick={() => navigate('/product')} className='text-[16px] font-semibold cursor-pointer text-gray-400'>Product</p>
             <p onClick={() => navigate('/cart')} className='text-[16px] font-semibold cursor-pointer text-gray-400'>Cart</p>
             <p onClick={() => navigate('/orders')} className='text-[16px] font-semibold cursor-pointer text-gray-400'>Orders</p>
             <button onClick={handleLogout} className='bg-blue-600 rounded cursor-pointer text-white text-[14px] font-medium py-0.5 px-2'>Logout</button>
        </div>
        <FiLogIn onClick={handleLogout} className='w-5 h-5 md:hidden cursor-pointer text-gray-400' />
    </div>
  )
}

export default Header
