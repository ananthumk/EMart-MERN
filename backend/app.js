const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const { default: connectDb } = require('./config/db')
const router = require('./routes/authRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')

const app = express()


dotenv.config();

app.use(express.json())
app.use(cookieParser());
app.use(cors())

connectDb()

app.use('/api/auth', router)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT ,  () => console.log(`server running at http://localhost:${PORT}`))