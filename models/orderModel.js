import mongoose from 'mongoose';

const { Schema } = mongoose;

const singleProduct = new Schema({
    name: {type:String, required:true},
    quantity: {type:Number, required:true},
    price: {type:Number, required:true},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
})

const orderSchema = new Schema({
    total: {
        type: Number,
        required: [true, 'total harga harus di isi']
    },
    itemDetails: [singleProduct],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'failed', 'succes'],
        default: 'pending'
    },
    firstName: {
        type: String,
        required: [true, 'nama depan harus di isi']
    },
    lastName: {
        type: String,
        required: [true, 'nama belakang harus di isi']
    },
    phone: {
        type: String,
        required: [true, 'nomor telepon harus di isi']
    },
    email: {
        type: String,
        required: [true, 'email harus di isi']
    }
});

const Order = mongoose.model("Order", orderSchema)

export default Order