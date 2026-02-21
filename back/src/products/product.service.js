import { prisma } from '../orm/client.js'

export async function deleteProduct(params) {
  return prisma.product.delete({
    where: params,
    select: {
      name: true,
    },
  })
}

export async function findAllProducts() {
  return prisma.product.findMany()
}

export async function findProduct(params) {
  return prisma.product.findFirst({
    where: params,
  })
}

export async function findProducts(params) {
  const where = {}

  if (params.name) {
    where.name = {
      contains: params.name,
      mode: 'insensitive',
    }
  }

  if (params.category) {
    where.category = params.category
  }

  return prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      description: true,
    },
  })
}

export async function productCheck(params) {
  const product = await findProduct(params)
  if (!product) {
    throw new Error('Not found')
  }
  return product
}

export async function productsCheck(params) {
  const products = await findProducts(params)
  if (!products) {
    throw new Error('Not found')
  }
  return products
}

export async function saveProduct(params) {
  return prisma.product.create({
    data: { ...params },
  })
}

export async function updateProduct(body, params) {
  return prisma.product.update({
    where: params,
    data: body,
  })
}
