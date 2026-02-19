import express from 'express'
import { postProduct, searchProducts, getProductById, getProducts, patchProductById, deleteProductById } from './product.controller.js'
import { validate } from '../middlewares/validate.js'
import { ProductDTO } from './product.dto.js'

export const productsRouter = express.Router()

/** Unauthenticated routes */
productsRouter.get('', getProducts)
/** dynamic route below after the static one because if the route below is above
 * the searchProducts one => it could lead to the showOneProduct route to catch
 * the word 'search' as an 'id'. But now it's not needed because 'search' route
 * is a POST HTTP method and not a GET.
*/
productsRouter.get('/:id', getProductById)

productsRouter.post('/search', searchProducts)

/** Authenticated routes */
productsRouter.post('', validate(ProductDTO), postProduct)

productsRouter.patch('/:id', patchProductById)

productsRouter.delete('/:id', deleteProductById)
