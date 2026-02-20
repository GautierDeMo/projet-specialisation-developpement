import express from 'express'
import { getStats } from './stats.controller.js'

export const statsRouter = express.Router()

statsRouter.get('/', getStats)
