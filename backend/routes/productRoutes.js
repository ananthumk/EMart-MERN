const express = require('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const productRouter = express.Router()
const { protect, admin } = require('../middleware/auth')

productRouter.get('/', protect, getProducts)
productRouter.get('/:id', protect, getProductById)

module.exports = productRouter