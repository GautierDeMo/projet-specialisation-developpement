import { prisma } from "../db/client.js"

export async function findProducts() {
  return await prisma.product.findMany()
}

export async function findProduct(where) {
  return await prisma.product.findFirst({
    where: where
  })
}

export async function saveProduct(params) {
  return await prisma.product.create({
    data: { ...params }
  })
}
