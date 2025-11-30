const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide an name for the product'],
        trim: true
    }, 
    description: {
        type: String, 
        required: [true, 'Please provide an description for the product']
    },
    price: {
        type: Number, 
        required: [true, 'Please provide a price'],
        min: [0, 'Price must be more than 0']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image url for the product']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Men', 'Women', 'Kids']
    },
    sizes: {
        type: [String],
        required: [true, 'Please provide an size'],
        enum: ['S','M', 'L','XL']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity '],
        default: 0
    }
}, {timeStamps: true})

module.exports = mongoose.model('Product', productSchema)