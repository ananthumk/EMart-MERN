const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: String,
        required: [true, 'Please select a size'],
        enum: ['S', 'M', 'L', 'XL']
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        default: 1
    }
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema]
}, { timeStamps: true })

module.exports = mongoose.model('Cart', cartSchema)

