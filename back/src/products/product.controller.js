// dans ce fichier sera la méthode de l'endpoint API stats
import { prisma } from "../db/client.js"

/** @type {import("express").RequestHandler} */
export async function showProducts(req, res, next) {
  try {
    res.json({ msg: "Here is a product" })
  } catch (error) {
    next(error)
  }
}

/** @type {import("express").RequestHandler} */
export async function showOneProduct(req, res, next) {
  try {
    res.json({ msg: "Here is a product" })
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
export async function createProduct(req, res, next) {
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
