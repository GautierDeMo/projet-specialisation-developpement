// dans ce fichier sera la méthode de l'endpoint API stats
import { urlToBase64 } from "../utils/utils.js"
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
export async function putProductById(req, res, next) {
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
    const { category, description, name, price } = req.body

    const existingProduct = await findProduct({
      name: name,
    })

    if (existingProduct) {
      return res.status(400).json({ msg: "Product already exists", product: existingProduct })
    }

    const productData = { category, description, name, price }

    const urlBase64 = await urlToBase64(req.body.image.url)

    if (req.body.image) {
      productData.images = {
        create: [{ url: req.body.image.url, urlBase64 }]
      }
    }

    const newProduct = await saveProduct(productData)

    return res.status(201).json({ msg: `New product created: ${name}`, product: newProduct, image: req.body.image })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function searchProductsByCategory(req, res, next) {
  try {
    if (req.params.category) {
      const products = await productsCheck({ category: req.params.category })
      res.json({ msg: "Here are the products", products: products })
    }
  } catch (error) {
    if (error.message === "Not found") {
      return res.status(404).json({ msg: "Product(s) not found" })
    }
    next(error)
  }
}
