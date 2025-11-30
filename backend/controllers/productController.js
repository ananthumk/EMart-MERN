const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try {
        const { search, category, size, minPrice, maxPrice, page = 1, limit = 10} = req.query

        let query = {}
        
        if(search){
            query.$or = [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}}
            ]
        }

        if(category && category !== 'ALL'){
            query.category = category 
        }

        if(size){
            query.size = size
        }

        if(minPrice || maxPrice){
            query.price = {}
            if(minPrice) query.price.$gte = Number(minPrice)
            if(maxPrice) query.price.$gte = Number(maxPrice) 
        }

        const pageNum = parseInt(page, 10)
        const limitNum = parseInt(limit, 10)
        const skip = (pageNum - 1) * limitNum

        const products = await Product.find(query).sort({createdAt: -1}).limit(limitNum).skip(skip)

        const total = await Product.countDocuments(query)

        res.status(200).json({
            count: products.length,
            total,
            page: pageNum,
            page: Math.ceil(total / limitNum),
            products
        })
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params 

        const product = await Product.findById(id)

        if(!product){
            return res.status(400).json({message: 'Product is not founded'})
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json({message: "Product added successfully", product})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product){
            return res.status(400).json({message: "Product not found"})
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(200).json({message: "Product updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(400).json({message: "Product not found"})
        }

        await product.deleteOne()

        res.status(200).json({message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

 
module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct}