import express from 'express'
import { orderController } from './order.controller'


const router = express.Router()



router.get('/orders/revenue', orderController.totalRevenue)
router.post('/orders', orderController.createOrder)

export const orderRouter = router