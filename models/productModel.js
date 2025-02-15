import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama Produk Harus diisi"],
    unique: [true, "Nama Produk sudah di gunakan silahkan buat yang lain"]
  }, 
  price: {
    type: Number,
    required: [true, "Harga Harus diisi"]
  },
  description: {
    type: String,
    required: [true, "Deskripsi Harus diisi"]
  },
  image: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: [true, "Kategori Produk Harus diisi"],
    enum:['sepatu', 'kemeja', 'baju', 'celana']
  },
  stock: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model("Product", productSchema)

export default Product