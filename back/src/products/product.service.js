import { prisma } from "../orm/client.js"

export async function deleteProduct(params) {
  return await prisma.product.delete({
    where: params,
    select: {
      name: true
    }
  })
}

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

export async function productCheck(params) {
  const product = await findProduct(params)
  if (!product) {
    throw new Error("Not found")
  }
  return product
}

export async function saveProduct(params) {
  return await prisma.product.create({
    data: { ...params }
  })
}

export async function updateProduct(body, params) {
  return await prisma.product.update({
    where: params,
    data: body
  })
}
