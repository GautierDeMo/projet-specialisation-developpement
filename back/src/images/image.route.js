import express from 'express'
import { postImageAfterProductCreation } from './image.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

export const imagesRouter = express.Router()

imagesRouter.post('/:productId', authenticate, postImageAfterProductCreation)
