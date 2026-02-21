import express from 'express'
import {
  postProduct,
  searchProducts,
  getProductById,
  getProducts,
  putProductById,
  deleteProductById,
} from './product.controller.js'
import { validate } from '../middlewares/validate.js'
import { ProductDTO } from './product.dto.js'
import { authenticate } from '../middlewares/authenticate.js'

export const productsRouter = express.Router()

/** Unauthenticated routes */
productsRouter.get('', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/search', searchProducts)

/** Authenticated routes */
productsRouter.post('', authenticate, validate(ProductDTO), postProduct)
productsRouter.put('/:id', authenticate, validate(ProductDTO), putProductById)
productsRouter.delete('/:id', authenticate, deleteProductById)
