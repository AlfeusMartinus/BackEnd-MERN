import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

export const createOrder = asyncHandler(async(req, res) => {
    const {email, firstName, lastName, phone, cartItem} = req.body

    if(!cartItem || cartItem.length < 1){
        res.status(400)
        throw new Error('keranjang masih kosong')
    }

    let orderItem = []
    let total = 0

    for(const cart of cartItem){
        const productData = await Product.findOne({_id: cart.product})
        if(!productData){
            res.status(404)
            throw new Error('id product tidak ditemukan')
        }

        const {name, price, _id} = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            product: _id
        }
        orderItem = [...orderItem, singleProduct]

        total += cart.quantity * price
    }

    const order = await Order.create({
        itemDetails: orderItem,
        total,
        firstName,
        lastName,
        email,
        phone,
        user: req.user.id
    })
    
    return res.status(201).json({
        total,
        order,
        message: 'Berhasil buat order produk'
    })
})

export const allOrder = asyncHandler(async(req, res) => {
    const orders = await Order.find()
    
    return res.status(201).json({
        data: orders,
        message: 'Berhasil tampil semua order produk'
    })
})

export const detailOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    return res.status(201).json({
        data: order,
        message: 'Berhasil tampil detail order produk'
    })
})

export const currentUserOrder = asyncHandler(async(req, res) => {
    const order = await Order.find({'user': req.user.id})
    
    return res.status(201).json({
        data: order,
        message: 'Berhasil tampil current user order produk'
    })
})
