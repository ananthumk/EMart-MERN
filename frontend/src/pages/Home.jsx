import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()
  return (
    <div>
        <Header />
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mx-auto pt-2.5 pb-12 md:pt-24 w-[90%] max-w-[1110px]">
      
      {/* Home Content */}
      <div className="flex flex-col items-center md:items-start">
        
        {/* Heading */}
        <h1 className="text-[#1e293b] font-bold text-[30px] md:text-[46px] leading-tight text-center md:text-left">
          Clothes That Get YOU Noticed
        </h1>
        
        {/* Mobile Image */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="w-[206px] md:hidden"
        />
        
        {/* Description */}
        <p className="mt-9 md:mt-0 mb-0 text-[#64748b] text-[14px] md:text-[18px] leading-7 text-center md:text-left">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        
        {/* Shop Now Button */}
        
          <button 
            type="button" 
            onClick={() => navigate('/product')}
            className="text-white text-[14px] md:text-[16px] font-normal border-none pt-3 pb-3 md:w-[150px] rounded-md bg-[#0967d2] mt-5 cursor-pointer outline-none hover:bg-[#0856b8] transition-colors"
          >
            Shop Now
          </button>
        
      </div>
      
      {/* Desktop Image */}
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="clothes that get you noticed"
        className="hidden md:block w-1/2 max-w-[450px] ml-[85px]"
      />
      
    </div>
    </div>
  )
}

export default Home
