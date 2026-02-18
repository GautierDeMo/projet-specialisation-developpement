import express from 'express'
import { createProduct, removeOneProduct, searchProducts, showOneProduct, showProducts, updateOneProduct } from './product.controller.js'

export const productsRouter = express.Router()

/** Unauthenticated routes */
productsRouter.get('', showProducts)
productsRouter.get('/search', searchProducts)
/** dynamic route after the static one because if the route below is above the
 * searchProducts one => it could lead to the showOneProduct route to catch the
 * word 'search' as an 'id'
 */
productsRouter.get('/:id', showOneProduct)

/** Authenticated routes */
productsRouter.post('', createProduct)

productsRouter.patch('/:id', updateOneProduct)

productsRouter.delete('/:id', removeOneProduct)
