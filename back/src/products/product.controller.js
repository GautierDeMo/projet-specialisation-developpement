// dans ce fichier sera la méthode de l'endpoint API stats
import { findProducts, findProduct, saveProduct } from "./product.service.js"

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
    const product = await findProduct({ id: Number(req.params.id) })

    if (!product) {
      res.status(404).json({ msg: "Product not found" })
    }

    return res.status(200).json({ msg: "Here is our product", product: product })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function postProduct(req, res, next) {
  try {
    const { category, description, name, price } = req.body
    const product = await findProduct({
      category: category,
      description: description,
      name: name,
      price: Number(price)
    })
    if (!product) {
      const newProduct = saveProduct({ category, description, name, price })
      return res.json({ msg: `New product created: ${name}`, product: newProduct })
    }
    return res.status(400).json("Product already exists")
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
export async function updateOneProduct(req, res, next) {
  try {
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
