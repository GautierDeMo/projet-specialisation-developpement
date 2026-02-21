import { apiFetch } from '../utils/client.js'

export async function getAllProducts() {
  const response = await apiFetch('/products')
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to fetch products')
  }
  return response.json()
}

export async function getProductById(id) {
  const response = await apiFetch(`/products/${id}`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to fetch product')
  }
  return response.json()
}

export async function searchProducts(filters) {
  const response = await apiFetch('/products/search', {
    method: 'POST',
    body: JSON.stringify(filters),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to search products')
  }
  return response.json()
}

export async function createProduct(productData) {
  const response = await apiFetch('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to create product')
  }
  return response.json()
}

export async function updateProduct(id, productData) {
  const response = await apiFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to update product')
  }
  return response.json()
}

export async function deleteProduct(id) {
  const response = await apiFetch(`/products/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to delete product')
  }
  return response.json()
}

export async function addImageToProduct(productId, imageData) {
  const response = await apiFetch(`/images/${productId}`, {
    method: 'POST',
    body: JSON.stringify(imageData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to add image')
  }
  return response.json()
}
