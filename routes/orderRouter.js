import express from 'express'
import { protectedMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import { createOrder, allOrder, detailOrder, currentUserOrder } from '../controller/orderController.js'

const router = express.Router()

router.post('/', protectedMiddleware, createOrder)
router.get('/', protectedMiddleware, adminMiddleware, allOrder)
router.get('/:id', protectedMiddleware, adminMiddleware, detailOrder)
router.get('/current/user', protectedMiddleware, currentUserOrder)

export default router