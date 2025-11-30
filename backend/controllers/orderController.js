const Order = require("../models/Order")
const Product = require("../models/Product")
const sendOrderEmail = require("../utils/sendEmail")


const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items provided" })
        }

        let orderItems = []
        let totalPrice = 0

        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product) {
                return res.status(400).json({ message: `Product not found: ${item.product}` })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }
            orderItems.push({
                product: product._id,
                name: product.name,
                size: item.size,
                quantity: item.quantity,
                price: product.price
            })

            totalPrice += product.price * item.quantity;
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalPrice,
            shippingAddress
        });

        await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: [] }
        );

        await order.populate('user', 'name email');


        try {
            await sendOrderEmail(order, req.user);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);

        }

        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort('-orderDate')
            .populate('items.product', 'name image');

        res.status(200).json({
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name image');

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }


        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Not authorized to view this order'
            });
        }

        res.status(200).json({
            data: order
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            data: order
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .sort('-orderDate')
            .populate('user', 'name email')
            .populate('items.product', 'name image');

        res.status(200).json({
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
};


module.exports = { getAllOrders, updateOrderStatus, getOrderById, getOrders, createOrder }