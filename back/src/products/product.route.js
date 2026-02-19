import express from 'express'
import { postProduct, removeOneProduct, searchProducts, getProductById, getProducts, updateOneProduct } from './product.controller.js'
import { validate } from '../middlewares/validate.js'
import { ProductDTO } from './product.dto.js'

export const productsRouter = express.Router()

/** Unauthenticated routes */
productsRouter.get('', getProducts)
productsRouter.get('/search', searchProducts)
/** dynamic route after the static one because if the route below is above the
 * searchProducts one => it could lead to the showOneProduct route to catch the
 * word 'search' as an 'id'
 */
productsRouter.get('/:id', getProductById)

/** Authenticated routes */
productsRouter.post('', validate(ProductDTO) , postProduct)

productsRouter.patch('/:id', updateOneProduct)

productsRouter.delete('/:id', removeOneProduct)
