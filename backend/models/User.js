const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: [true, 'Please provide an name'],
        maxLength: [50, 'Name should not be not more than 50 character']
    },
    email: {
        type: String, 
        unique: true,
        required: [true, 'Please provide an email address'],
        lowercase: true,
        match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
    },
    password: {
        type: String, 
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password should be atleast 6 character'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)