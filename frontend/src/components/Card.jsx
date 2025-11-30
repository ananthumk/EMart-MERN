import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ product }) => {
    const navigate = useNavigate()
  return (
    <div
    onClick={() => navigate(`/product/${product._id}`)}
      key={product._id}
      className="w-[300px] mt-4 rounded-xl bg-white shadow-md hover:shadow-xl
                 transition-all duration-300 cursor-pointer p-4 flex flex-col gap-3
                 hover:-translate-y-1 border border-gray-200"
    >
      <div className="w-full h-[260px] rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h2>

      <p className="text-xl font-bold text-indigo-600">
        ₹{product.price}
      </p>
    </div>
  )
}

export default Card
