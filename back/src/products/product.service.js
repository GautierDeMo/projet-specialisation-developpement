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
  return await prisma.product.findMany({
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
        take: 1,
      },
    },
  })
}

export async function findProduct(params) {
  const product = await prisma.product.findFirst({
    where: params,
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  })

  if (!product) return null
  return product
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

  return await prisma.product.findMany({
    where,
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
        take: 1, // Only get first image for card display
      },
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
  if (!products || products.length === 0) {
    throw new Error('Not found')
  }
  return products
}

export async function saveProduct(params) {
  return prisma.product.create({
    data: { ...params },
    include: { images: true },
  })
}

export async function updateProduct(body, params) {
  return prisma.product.update({
    where: params,
    data: body,
  })
}
