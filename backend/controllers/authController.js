const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, Email, Password are required' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: 'User already exists' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })

        const token = generateToken(user._id)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            token,
            user
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = generateToken(user._id)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            token,
            user
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { register, login}