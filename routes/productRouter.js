import express from 'express'
import { protectedMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import { createProduct, updateProduct, deleteProduct, detailProduct, fileUpload, allProduct } from '../controller/productController.js'
import { upload } from '../utils/uploadFileHandler.js'


const router = express.Router()

// CRUD Product

router.post('/', protectedMiddleware, adminMiddleware, createProduct)
router.get('/', allProduct)
router.get('/:id', detailProduct)
router.put('/:id', protectedMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProduct)
router.post('/file-upload', protectedMiddleware, adminMiddleware, upload.single('image'), fileUpload)

export default router