import { useState,useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import AppContext from './context/AppContext'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
  },[])

  const updateToken = (newToken) => {
    setToken(newToken)
    if(newToken){
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const url = 'http://localhost:4000/api/'

  return (
    <AppContext.Provider value={{
      url: url, token: token, updateToken: updateToken
    }}>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
