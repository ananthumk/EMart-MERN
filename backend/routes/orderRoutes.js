const express = require('express')
const { createOrder, getOrders, getOrderById, updateOrderStatus, getAllOrders } = require('../controllers/orderController')
const { protect, admin } = require('../middleware/auth')
const orderRouter = express.Router()

orderRouter.post('/', protect, createOrder)
orderRouter.get('/', protect, getOrders)
orderRouter.get('/:id', protect, getOrderById)


module.exports = orderRouter