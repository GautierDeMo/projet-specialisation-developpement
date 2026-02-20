import express from 'express'
import { productsRouter } from '../products/product.route.js'
import { imagesRouter } from '../images/image.route.js'
import { UserRouter } from '../users/user.route.js'
import statsRoutes from '../stats/stats.routes.js'

export const router = express.Router()

router.use('/products', productsRouter)
router.use('/images', imagesRouter)
router.use('/user', UserRouter)
app.use('/stats', statsRoutes)
