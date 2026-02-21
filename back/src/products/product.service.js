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
  const products = await prisma.product.findMany({
    include: {
      images: {
        select: {
          id: true,
          data: true,
        },
        take: 1,
      },
    },
  })

  // Convert image data to base64 for JSON serialization
  return products.map((product) => ({
    ...product,
    images: product.images.map((image) => ({
      ...image,
      data: image.data ? Buffer.from(image.data).toString('base64') : null,
    })),
  }))
}

export async function findProduct(params) {
  const product = await prisma.product.findFirst({
    where: params,
    include: {
      images: {
        select: {
          id: true,
          data: true,
        },
      },
    },
  })

  if (!product) return null

  // Convert image data to base64 for JSON serialization
  return {
    ...product,
    images: product.images.map((image) => ({
      ...image,
      data: image.data ? Buffer.from(image.data).toString('base64') : null,
    })),
  }
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

  const products = await prisma.product.findMany({
    where,
    include: {
      images: {
        select: {
          id: true,
          data: true,
        },
        take: 1, // Only get first image for card display
      },
    },
  })

  // Convert image data to base64 for JSON serialization
  return products.map((product) => ({
    ...product,
    images: product.images.map((image) => ({
      ...image,
      data: image.data ? Buffer.from(image.data).toString('base64') : null,
    })),
  }))
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
  })
}

export async function updateProduct(body, params) {
  return prisma.product.update({
    where: params,
    data: body,
  })
}
