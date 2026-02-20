import express from 'express'
import { productsRouter } from '../products/product.route.js'
import { imagesRouter } from '../images/image.route.js'

export const router = express.Router()

router.use('/products', productsRouter)
router.use('/images', imagesRouter)
