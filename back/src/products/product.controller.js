// dans ce fichier sera la méthode de l'endpoint API stats
import { saveImage } from "../images/image.service.js"
import { findProduct, saveProduct, productCheck, updateProduct, deleteProduct, findAllProducts, productsCheck } from "./product.service.js"

/** @type {import("express").RequestHandler} */
export async function deleteProductById(req, res, next) {
  try {
    await productCheck({ id: Number(req.params.id) })

    const productToDelete = await deleteProduct({ id: Number(req.params.id) })
    res.status(200).json({ msg: `Here is the deleted product: ${productToDelete.name}` })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function getProducts(req, res, next) {
  try {
    const products = await findAllProducts()

    if (!products.length) {
      return res.status(404).json({ msg: "No products in this query", })
    }

    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function getProductById(req, res, next) {
  try {
    const product = await productCheck({ id: Number(req.params.id) })
    return res.status(200).json({ msg: "Here is our product", product: product })
  } catch (error) {
    if (error.message === "Not found") {
      return res.status(404).json({ msg: "Product not found" })
    }
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function patchProductById(req, res, next) {
  try {
    await productCheck({ id: Number(req.params.id) })

    const updatedProduct = await updateProduct(req.body, { id: Number(req.params.id) })
    return res.status(200).json({ msg: `Here is the updated product: ${updatedProduct.name}`, product: updatedProduct })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function postProduct(req, res, next) {
  try {
    const { category, description, name, price, imageUrl } = req.body

    const existingProduct = await findProduct({
      category: category,
      description: description,
      name: name,
      price: Number(price)
    })

    if (existingProduct) {
      return res.status(400).json({ msg: "Product already exists", product: existingProduct })
    }

    const newProduct = await saveProduct({ category, description, name, price })

    if (imageUrl) {
      const newImage = await saveImage({ productId: newProduct.id, imageUrl })
      return res.status(201).json({ msg: `New product created: ${name}`, product: newProduct, image: newImage })
    }

    return res.status(201).json({ msg: `New product created: ${name}`, product: newProduct })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function searchProducts(req, res, next) {
  try {
    const { category, description, name, price } = req.body

    const filters = {}
    if (category) filters.category = category
    if (description) filters.description = description
    if (name) filters.name = name
    if (price !== undefined) filters.price = Number(price)

    const products = await productsCheck(filters)

    res.json({ msg: "Here are the products", products: products })
  } catch (error) {
    if (error.message === "Not found") {
      return res.status(404).json({ msg: "Product not found" })
    }
    next(error)
  }
}
