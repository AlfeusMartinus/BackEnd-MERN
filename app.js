import express from 'express'
import authRouter from "./routes/authRouter.js"
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRouter.js'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import { notFound, errorHandler } from './middleware/errorMidleware.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import { v2 as cloudinary } from 'cloudinary';

dotenv.config()

const app = express()
const port = 3000

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// middleware
app.use(express.json())
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

// parent route
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Connection
mongoose.connect(process.env.DATABASE, {

}).then(() => {
    console.log("Database Connect")
})