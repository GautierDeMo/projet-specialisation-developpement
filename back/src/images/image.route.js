import express from 'express'
import { postImageAfterProductCreation } from './image.controller.js'

export const imagesRouter = express.Router()

imagesRouter.post('/:productId', postImageAfterProductCreation)
