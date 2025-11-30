const Cart = require("../models/Cart")
const Product = require("../models/Product")

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] })
        }

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, size, quantity = 1 } = req.body

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).json({ message: "Product not found" })
        }

        if (!product.sizes.includes(size)) {
            return res.status(400).json({ message: 'Size not available for this product' })
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" })
        }

        let cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: []
            })
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity
        } else {
            cart.items.push({
                product: productId,
                size,
                quantity
            })
        }

        await cart.save()
        await cart.populate('items.product')

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log('Add cart: ', error)
    }
}

const updateCart = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body

        if (quantity > 1) {
            return res.status(400).json({ message: 'Quantity should atleast 1' })
        }

        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' })
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size
        )

        if (itemIndex === -1) {
            return res.status(400).json({ message: 'Item not found in cart' })
        }

        const product = await Product.findById(productId)
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' })
        }

        cart.items[itemIndex].quantity = quantity;

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const removeCart = async (req, res) => {
    try {
        const {productId, size} = req.body

        const cart = await Cart.findOne({ user: req.user._id })

        if(!cart){
            res.status(400).json({message: "Cart not found"})
        }

        cart.items = cart.items.filter(item => !(item.product.toString() === productId && item.size === size))

        await cart.save()
        await cart.populate('items.product')

        return res.status(200).json({message: 'Product Removed', cart})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}
 
module.exports = { getCart, addToCart, updateCart , removeCart }