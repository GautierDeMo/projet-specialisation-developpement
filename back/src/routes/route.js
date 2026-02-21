import { Router } from 'express'
import { userRouter } from '../users/user.route.js'
import { statsRouter } from '../stats/stats.routes.js'
import { cspRouter } from '../csp/csp.routes.js'

export const router = Router()

router.use('/stats', statsRouter)
router.use('/user', userRouter)
router.use('/csp', cspRouter)
