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

export async function searchProducts(filters, csrfToken) {
  const response = await apiFetch('/products/search', {
    method: 'POST',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(filters),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to search products')
  }
  return response.json()
}

export async function createProduct(productData, csrfToken) {
  const response = await apiFetch('/products', {
    method: 'POST',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to create product')
  }
  return response.json()
}

export async function updateProduct(id, productData, csrfToken) {
  const response = await apiFetch(`/products/${id}`, {
    method: 'PUT',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to update product')
  }
  return response.json()
}

export async function deleteProduct(id, csrfToken) {
  const response = await apiFetch(`/products/${id}`, {
    method: 'DELETE',
    headers: {
      'x-csrf-token': csrfToken,
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to delete product')
  }
  return response.json()
}

export async function addImageToProduct(productId, imageData, csrfToken) {
  const response = await apiFetch(`/images/${productId}`, {
    method: 'POST',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(imageData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.msg || 'Failed to add image')
  }
  return response.json()
}
