const express = require('express')
const { addToCart, getCart, updateCart, removeCart } = require('../controllers/cartController')
const { protect } = require('../middleware/auth')
const cartRouter = express.Router()

cartRouter.use(protect)

cartRouter.post('/add', addToCart)
cartRouter.get('/', getCart)
cartRouter.put('/update', updateCart)
cartRouter.delete('/remove', removeCart)

module.exports = cartRouter