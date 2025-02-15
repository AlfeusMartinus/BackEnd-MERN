import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'

export const createProduct = asyncHandler(async(req, res) => {
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
        message: 'Berhasil tambah produk',
        data: newProduct
    })
})

export const allProduct = asyncHandler(async(req, res) => {
    const queryObj = {...req.query}

    const excludeField = ['page', 'limit']
    excludeField.forEach((element) => delete queryObj[element])

    let query 

    if (req.query.name) {
        query = Product.find({
            name: { $regex: req.query.name, $options: 'i' }
        })
    } else {
        query = Product.find(queryObj)
    }


    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 30
    const skipData = (page - 1) * limitData

    query = query.skip(skipData).limit(limitData)

    let countProduct = await Product.countDocuments()
    if(req.query.page) {
        if (skipData >= countProduct) {
            res.status(404)            
            throw new Error('this page doesnt exist')
        }
    }

    const data = await query

    return res.status(200).json({
        message: 'Berhasil tampil semua produk',
        data,
        count: countProduct
    })
})

export const detailProduct = asyncHandler(async(req, res) => {
    const paramsId = req.params.id
    const productData = await Product.findById(paramsId)

    if(!productData){
        res.status(404)
        throw new Error('id tidak ditemukan')
    }

    return res.status(200).json({
        message: 'detail data produk berhasil ditampilkan',
        data: productData
    })
})

export const updateProduct = asyncHandler(async(req, res) => {
    const paramId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(paramId, 
        req.body, {
            runValidators: false,
            new: true
        }
    )

    return res.status(201).json({
        message: 'update produk berhasil',
        data: updateProduct
    })
})

export const deleteProduct = asyncHandler(async(req, res) => {
    const paramId = req.params.id
    await Product.findByIdAndDelete(paramId)
    return res.status(200).json({
        message: 'produk berhasil dihapus'
    })
})

export const fileUpload = asyncHandler(async(req, res) => {
    const file = req.file
    if(!file){
        res.status(400)
        throw new Error('tidak ada file yang diinput')
    }

    const imageFileName = file.filename
    const pathImageFile = `/uploads/${imageFileName}`

    res.status(200).json({
        message: 'image berhasil di upload',
        image: pathImageFile
    })
})