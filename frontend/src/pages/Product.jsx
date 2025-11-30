import React from 'react'
import Header from '../components/Header'
import { useContext } from 'react'

import axios from 'axios'
import { useState,useEffect } from 'react'
import Card from '../components/Card'
import AppContext from '../context/AppContext'

const Product = () => {
  const [products, setProducts] = useState([])
  const {url, token} = useContext(AppContext)

  useEffect(() => {
    console.log(url, token)
    if(!token) return
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}product/`, {headers: {
          Authorization: `Bearer ${token}`
        }})
        if(response.status === 200 || response.status === 201){
          setProducts(response.data.products)
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()

  }, [url, token])

  return (
    <div className=''>
      <Header />
      <div className='w-[85%] mx-auto h-[90vh]'>
        <div className='flex items-center gap-5 flex-wrap'>
         {products?.map(product => (
            <Card product={product} />
         ))}
         </div>
      </div>
    </div>
  )
}

export default Product
