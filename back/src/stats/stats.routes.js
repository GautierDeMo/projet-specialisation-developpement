import express from 'express'
import { getStats } from './stats.controller.js'

const router = express.Router()

router.get('/categories', getStats)

export default router
