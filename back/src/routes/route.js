import { Router } from 'express'
import { userRouter } from '../users/user.route.js'
import { statsRouter } from '../stats/stats.routes.js'
import { cspRouter } from '../csp/csp.routes.js'
import { productsRouter } from '../products/product.route.js'
import { imagesRouter } from '../images/image.route.js'

export const router = Router()

router.use('/images', imagesRouter)
router.use('/products', productsRouter)
router.use('/stats', statsRouter)
router.use('/user', userRouter)
router.use('/csp', cspRouter)
