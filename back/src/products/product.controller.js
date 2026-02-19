// dans ce fichier sera la méthode de l'endpoint API stats
import { findProducts, findProduct, saveProduct, productCheck } from "./product.service.js"

/** @type {import("express").RequestHandler} */
export async function getProducts(req, res, next) {
  try {
    const products = await findProducts()

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
export async function postProduct(req, res, next) {
  try {
    const { category, description, name, price } = req.body
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
    return res.json({ msg: `New product created: ${name}`, product: newProduct })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function searchProducts(req, res, next) {
  try {
    res.json({ msg: "Here is a product" })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function patchProduct(req, res, next) {
  try {
    const product = await productCheck({ id: Number(req.params.id) })
    res.json({ msg: "Here is a product" })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function removeOneProduct(req, res, next) {
  try {
    res.json({ msg: "Here is a product" })
  } catch (error) {
    next(error)
  }
}
