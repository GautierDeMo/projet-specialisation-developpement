import { jest, describe, it, expect, beforeEach } from '@jest/globals'

// Mock Prisma client
jest.unstable_mockModule('../orm/client.js', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    image: {
      create: jest.fn(),
    },
  },
}))

const {
  deleteProduct,
  findAllProducts,
  findProduct,
  findProducts,
  productCheck,
  productsCheck,
  saveProduct,
  updateProduct,
} = await import('../products/product.service.js')

const { prisma } = await import('../orm/client.js')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('findAllProducts', () => {
  it('returns all products with their first image converted to base64', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produit A',
        category: 'Test',
        description: 'Description A',
        price: 10.5,
        images: [{ id: 1, data: Buffer.from('image-data') }],
      },
      {
        id: 2,
        name: 'Produit B',
        category: 'Test',
        description: 'Description B',
        price: 20,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await findAllProducts()

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      include: {
        images: {
          select: { id: true, data: true },
          take: 1,
        },
      },
    })
    expect(result).toHaveLength(2)
    expect(result[0].images[0].data).toBe(
      Buffer.from('image-data').toString('base64')
    )
  })

  it('returns empty array when no products exist', async () => {
    prisma.product.findMany.mockResolvedValue([])

    const result = await findAllProducts()

    expect(result).toEqual([])
  })
})

describe('findProduct', () => {
  it('returns a product by id with images converted to base64', async () => {
    const mockProduct = {
      id: 1,
      name: 'Produit Test',
      category: 'Catégorie',
      description: 'Description',
      price: 15.99,
      images: [{ id: 1, data: Buffer.from('test-image') }],
    }
    prisma.product.findFirst.mockResolvedValue(mockProduct)

    const result = await findProduct({ id: 1 })

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        images: {
          select: { id: true, data: true },
        },
      },
    })
    expect(result.name).toBe('Produit Test')
    expect(result.images[0].data).toBe(
      Buffer.from('test-image').toString('base64')
    )
  })

  it('returns null when product not found', async () => {
    prisma.product.findFirst.mockResolvedValue(null)

    const result = await findProduct({ id: 999 })

    expect(result).toBeNull()
  })

  it('returns product with null image data when image has no data', async () => {
    const mockProduct = {
      id: 1,
      name: 'Produit Sans Image',
      category: 'Test',
      description: 'Desc',
      price: 10,
      images: [{ id: 1, data: null }],
    }
    prisma.product.findFirst.mockResolvedValue(mockProduct)

    const result = await findProduct({ id: 1 })

    expect(result.images[0].data).toBeNull()
  })
})

describe('findProducts', () => {
  it('returns products filtered by name (case insensitive)', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Lait',
        category: 'Alimentation',
        description: 'Desc',
        price: 2.5,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await findProducts({ name: 'lait' })

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: 'lait',
          mode: 'insensitive',
        },
      },
      include: {
        images: {
          select: { id: true, data: true },
          take: 1,
        },
      },
    })
    expect(result).toHaveLength(1)
  })

  it('returns products filtered by category', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produit A',
        category: 'Sport',
        description: 'Desc',
        price: 10,
        images: [],
      },
      {
        id: 2,
        name: 'Produit B',
        category: 'Sport',
        description: 'Desc',
        price: 20,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await findProducts({ category: 'Sport' })

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { category: 'Sport' },
      include: {
        images: {
          select: { id: true, data: true },
          take: 1,
        },
      },
    })
    expect(result).toHaveLength(2)
  })

  it('returns products filtered by both name and category', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Ballon',
        category: 'Sport',
        description: 'Desc',
        price: 15,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await findProducts({ name: 'ball', category: 'Sport' })

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        name: { contains: 'ball', mode: 'insensitive' },
        category: 'Sport',
      },
      include: {
        images: {
          select: { id: true, data: true },
          take: 1,
        },
      },
    })
  })

  it('returns all products when no filters provided', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produit 1',
        category: 'A',
        description: 'Desc',
        price: 10,
        images: [],
      },
      {
        id: 2,
        name: 'Produit 2',
        category: 'B',
        description: 'Desc',
        price: 20,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await findProducts({})

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {},
      include: {
        images: {
          select: { id: true, data: true },
          take: 1,
        },
      },
    })
    expect(result).toHaveLength(2)
  })
})

describe('productCheck', () => {
  it('returns product when found', async () => {
    const mockProduct = {
      id: 1,
      name: 'Produit',
      category: 'Test',
      description: 'Desc',
      price: 10,
      images: [],
    }
    prisma.product.findFirst.mockResolvedValue(mockProduct)

    const result = await productCheck({ id: 1 })

    expect(result.name).toBe('Produit')
  })

  it('throws Error when product not found', async () => {
    prisma.product.findFirst.mockResolvedValue(null)

    await expect(productCheck({ id: 999 })).rejects.toThrow('Not found')
  })
})

describe('productsCheck', () => {
  it('returns products when found', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produit',
        category: 'Test',
        description: 'Desc',
        price: 10,
        images: [],
      },
    ]
    prisma.product.findMany.mockResolvedValue(mockProducts)

    const result = await productsCheck({ category: 'Test' })

    expect(result).toHaveLength(1)
  })

  it('throws Error when products not found', async () => {
    prisma.product.findMany.mockResolvedValue([])

    await expect(productsCheck({ category: 'Inexistant' })).rejects.toThrow(
      'Not found'
    )
  })
})

describe('saveProduct', () => {
  it('creates a new product with provided data', async () => {
    const productData = {
      name: 'Nouveau Produit',
      category: 'Test',
      description: 'Nouvelle description',
      price: 25.99,
    }
    const mockCreatedProduct = { id: 1, ...productData }
    prisma.product.create.mockResolvedValue(mockCreatedProduct)

    const result = await saveProduct(productData)

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: productData,
    })
    expect(result.id).toBe(1)
    expect(result.name).toBe('Nouveau Produit')
  })

  it('creates product with minimal data', async () => {
    const productData = {
      name: 'Produit Minimal',
      category: 'Test',
      description: 'Desc',
      price: 0,
    }
    prisma.product.create.mockResolvedValue({ id: 1, ...productData })

    const result = await saveProduct(productData)

    expect(result.price).toBe(0)
  })
})

describe('updateProduct', () => {
  it('updates a product with new data', async () => {
    const updateData = {
      name: 'Produit Modifié',
      category: 'Nouvelle Catégorie',
      description: 'Description modifiée',
      price: 30.5,
    }
    const mockUpdatedProduct = { id: 1, ...updateData }
    prisma.product.update.mockResolvedValue(mockUpdatedProduct)

    const result = await updateProduct(updateData, { id: 1 })

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    })
    expect(result.name).toBe('Produit Modifié')
    expect(result.price).toBe(30.5)
  })

  it('updates only specified fields', async () => {
    const updateData = { price: 15 }
    const mockUpdatedProduct = {
      id: 1,
      name: 'Produit',
      category: 'Test',
      description: 'Desc',
      price: 15,
    }
    prisma.product.update.mockResolvedValue(mockUpdatedProduct)

    const result = await updateProduct(updateData, { id: 1 })

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    })
    expect(result.price).toBe(15)
  })
})

describe('deleteProduct', () => {
  it('deletes a product and returns its name', async () => {
    const mockDeletedProduct = { id: 1, name: 'Produit Supprimé' }
    prisma.product.delete.mockResolvedValue(mockDeletedProduct)

    const result = await deleteProduct({ id: 1 })

    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
      select: { name: true },
    })
    expect(result.name).toBe('Produit Supprimé')
  })

  it('deletes product by different params (name)', async () => {
    const mockDeletedProduct = { name: 'Produit Unique' }
    prisma.product.delete.mockResolvedValue(mockDeletedProduct)

    const result = await deleteProduct({ name: 'Produit Unique' })

    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { name: 'Produit Unique' },
      select: { name: true },
    })
  })
})
