import { prisma } from "../orm/client.js"

export async function findProducts() {
  return await prisma.product.findMany()
}

export async function findProduct(params) {
  return await prisma.product.findFirst({
    where: params,
    select: {
      name: true
    }
  })
}

export async function saveProduct(params) {
  return await prisma.product.create({
    data: { ...params }
  })
}

export async function productCheck(params) {
  const product = await findProduct(params)
  if (!product) {
    throw new Error("Not found")
  }
  return product
}
