import { getAllProducts, deleteProduct } from '../../api/product.js'
import { authStore } from '../../store/auth.js'
import { createTrustedHTML } from '../../utils/trustedTypes.js'
import { addToCart } from '../cart.js'
import { getCsrfToken } from '../../utils/csrf.js'

export default async function render(container) {
  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-6xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Nos Produits</h1>
        <div class="flex gap-3">
          <button id="search-btn" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer">
            🔍 Rechercher
          </button>
          ${
            authStore.isAuthenticated()
              ? `
            <a href="#/products/create" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer">
              ➕ Ajouter
            </a>
          `
              : ''
          }
        </div>
      </div>

      <!-- Search form (hidden by default) -->
      <div id="search-form" class="hidden mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Rechercher des produits</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input id="search-name" type="text" placeholder="ex: Lait" class="w-full border border-gray-300 rounded-lg px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select id="search-category" class="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Toutes les catégories</option>
              <option value="Alimentation">Alimentation</option>
              <option value="Ameublement">Ameublement</option>
              <option value="Sport">Sport</option>
              <option value="Ménage">Ménage</option>
              <option value="Hygiène">Hygiène</option>
              <option value="Électronique">Électronique</option>
              <option value="Jardin">Jardin</option>
              <option value="Vêtements">Vêtements</option>
            </select>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button id="apply-search" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
            Appliquer
          </button>
          <button id="cancel-search" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer">
            Annuler
          </button>
        </div>
      </div>

      <div id="products-container">
        <p class="text-gray-500">Chargement...</p>
      </div>
    </div>
  `)

  await loadProducts()

  // Search form toggle
  const searchBtn = container.querySelector('#search-btn')
  const searchForm = container.querySelector('#search-form')

  searchBtn.addEventListener('click', () => {
    searchForm.classList.toggle('hidden')
  })

  // Search functionality
  const applySearchBtn = container.querySelector('#apply-search')
  const cancelSearchBtn = container.querySelector('#cancel-search')

  applySearchBtn.addEventListener('click', async () => {
    const filters = {}
    const name = container.querySelector('#search-name').value.trim()
    const category = container.querySelector('#search-category').value.trim()

    if (name) filters.name = name
    if (category) filters.category = category

    const csrfToken = await getCsrfToken()
    await searchProducts(filters, csrfToken)
  })

  cancelSearchBtn.addEventListener('click', () => {
    container.querySelector('#search-name').value = ''
    container.querySelector('#search-category').value = ''
    searchForm.classList.add('hidden')
    loadProducts()
  })
}

async function loadProducts() {
  const container = document.querySelector('#products-container')

  try {
    const response = await getAllProducts()
    const products = Array.isArray(response)
      ? response
      : response.products || []

    if (products.length === 0) {
      container.innerHTML = createTrustedHTML(`
        <div class="text-center py-12 bg-gray-50 rounded-lg">
          <p class="text-2xl mb-2">📦</p>
          <p class="text-gray-600 text-lg">Aucun produit trouvé.</p>
          ${
            authStore.isAuthenticated()
              ? `
            <p class="text-gray-500 text-sm mt-2">
              <a href="#/products/create" class="text-blue-600 hover:underline">Ajoutez votre premier produit</a>
            </p>
          `
              : ''
          }
        </div>
      `)
      return
    }

    const productsHTML = products
      .map((product) => {
        const hasImage =
          product.images && product.images.length > 0 && product.images[0].data
        const imageHtml = hasImage
          ? `<img src="data:image/jpeg;base64,${product.images[0].data}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-lg">`
          : ''

        return `
      <div class="border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition overflow-hidden">
        ${imageHtml}
        <div class="p-4">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
              <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ${product.category}
              </span>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold text-green-600">${product.price.toFixed(2)} €</p>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>

          <div class="flex justify-between items-center">
            <a href="#/products/${product.id}" class="text-blue-600 hover:underline text-sm font-medium">
              👁️ Voir détails
            </a>

            ${
              authStore.isAuthenticated()
                ? `
              <div class="flex gap-2">
                <button class="add-to-cart-btn text-green-600 hover:underline text-sm font-medium cursor-pointer" data-product-id="${product.id}">
                🛒 Ajouter au panier
                </button>
                <a href="#/products/${product.id}/edit" class="text-yellow-600 hover:underline text-sm font-medium">
                  ✏️ Modifier
                </a>
                <button class="delete-product-btn text-red-600 hover:underline text-sm font-medium cursor-pointer" data-product-id="${product.id}">
                  🗑️ Supprimer
                </button>
              </div>
            `
                : `
              <button class="add-to-cart-btn bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition cursor-pointer" data-product-id="${product.id}">
                🛒 Ajouter au panier
              </button>
            `
            }
          </div>
        </div>
      </div>
    `
      })
      .join('')

    container.innerHTML = createTrustedHTML(`
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${productsHTML}
      </div>
    `)

    // Add event listeners for "Add to cart" buttons
    const addToCartButtons = container.querySelectorAll('.add-to-cart-btn')
    addToCartButtons.forEach((btn) => {
      const productId = Number.parseInt(btn.dataset.productId)
      const product = products.find((p) => p.id === productId)

      if (product) {
        btn.addEventListener('click', () => {
          const productData = {
            id: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image:
              product.images && product.images.length > 0
                ? product.images[0].url
                : null,
          }
          addToCart(productData)
        })
      }
    })

    // Add event listeners for "Delete product" buttons
    const deleteButtons = container.querySelectorAll('.delete-product-btn')
    deleteButtons.forEach((btn) => {
      const productId = Number.parseInt(btn.dataset.productId)

      btn.addEventListener('click', async () => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
          return
        }

        try {
          const csrfToken = await getCsrfToken()
          await deleteProduct(productId, csrfToken)
          alert('✅ Produit supprimé avec succès')
          await loadProducts() // Reload the products list
        } catch (error) {
          alert('❌ Erreur lors de la suppression: ' + error.message)
        }
      })
    })
  } catch (error) {
    container.innerHTML = createTrustedHTML(`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ Erreur lors du chargement des produits</p>
        <p class="text-red-500 text-sm mt-2">${error.message}</p>
      </div>
    `)
  }
}

async function searchProducts(filters, csrfToken) {
  const container = document.querySelector('#products-container')

  try {
    const response = await import('../../api/product.js').then((m) =>
      m.searchProducts(filters, csrfToken)
    )
    const products = response.products || []

    if (products.length === 0) {
      container.innerHTML = createTrustedHTML(`
        <div class="text-center py-12 bg-gray-50 rounded-lg">
          <p class="text-2xl mb-2">🔍</p>
          <p class="text-gray-600 text-lg">Aucun produit trouvé pour ces critères.</p>
        </div>
      `)
      return
    }

    // Reuse the same rendering logic as loadProducts
    const productsHTML = products
      .map((product) => {
        const hasImage =
          product.images && product.images.length > 0 && product.images[0].data
        const imageHtml = hasImage
          ? `<img src="data:image/jpeg;base64,${product.images[0].data}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-lg">`
          : ''

        return `
      <div class="border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition overflow-hidden">
        ${imageHtml}
        <div class="p-4">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
              <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ${product.category}
              </span>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold text-green-600">${product.price.toFixed(2)} €</p>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>

          <div class="flex justify-between items-center">
            <a href="#/products/${product.id}" class="text-blue-600 hover:underline text-sm font-medium">
              👁️ Voir détails
            </a>

            ${
              authStore.isAuthenticated()
                ? `
              <div class="flex gap-2">
                <button class="add-to-cart-btn text-green-600 hover:underline text-sm font-medium cursor-pointer" data-product-id="${product.id}">
                  🛒 Ajouter au panier
                </button>
                <a href="#/products/${product.id}/edit" class="text-yellow-600 hover:underline text-sm font-medium">
                  ✏️ Modifier
                </a>
                <button class="delete-product-btn text-red-600 hover:underline text-sm font-medium cursor-pointer" data-product-id="${product.id}">
                  🗑️ Supprimer
                </button>
              </div>
            `
                : `
              <button class="add-to-cart-btn bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition cursor-pointer" data-product-id="${product.id}">
                🛒 Ajouter au panier
              </button>
            `
            }
          </div>
        </div>
      </div>
    `
      })
      .join('')

    container.innerHTML = createTrustedHTML(`
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${productsHTML}
      </div>
    `)

    // Add event listeners for "Add to cart" buttons in search results
    const addToCartButtons = container.querySelectorAll('.add-to-cart-btn')
    addToCartButtons.forEach((btn) => {
      const productId = Number.parseInt(btn.dataset.productId)
      const product = products.find((p) => p.id === productId)

      if (product) {
        btn.addEventListener('click', () => {
          const productData = {
            id: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image:
              product.images && product.images.length > 0
                ? product.images[0].url
                : null,
          }
          addToCart(productData)
        })
      }
    })

    // Add event listeners for "Delete product" buttons in search results
    const deleteButtons = container.querySelectorAll('.delete-product-btn')
    deleteButtons.forEach((btn) => {
      const productId = Number.parseInt(btn.dataset.productId)

      btn.addEventListener('click', async () => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
          return
        }

        try {
          const csrfToken = await getCsrfToken()
          await deleteProduct(productId, csrfToken)
          alert('✅ Produit supprimé avec succès')
          const newCsrfToken = await getCsrfToken()
          await searchProducts({}, newCsrfToken)
        } catch (error) {
          alert('❌ Erreur lors de la suppression: ' + error.message)
        }
      })
    })
  } catch (error) {
    container.innerHTML = createTrustedHTML(`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ Erreur lors de la recherche</p>
      </div>
    `)
    console.log(error)
  }
}
