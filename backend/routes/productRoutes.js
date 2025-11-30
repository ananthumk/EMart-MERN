const express = require('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const productRouter = express.Router()
const { protect, admin } = require('../middleware/auth')

productRouter.get('/', protect, getProducts)
productRouter.get('/:id', protect, getProductById)

productRouter.post('/', protect, admin, createProduct)
productRouter.put('/:id', protect, admin, updateProduct)
productRouter.delete('/:id', protect, admin, deleteProduct)

module.exports = productRouter