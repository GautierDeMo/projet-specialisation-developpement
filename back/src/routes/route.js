import express from 'express'
import { productsRouter } from '../products/product.route.js'
import { imagesRouter } from '../images/image.route.js'
import { userRouter } from '../users/user.route.js'
import { statsRouter } from '../stats/stats.routes.js'

export const router = express.Router()

router.use('/images', imagesRouter)
router.use('/products', productsRouter)
router.use('/stats', statsRouter)
router.use('/user', userRouter)
