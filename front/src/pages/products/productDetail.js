import { getProductById, deleteProduct } from '../../api/product.js'
import { authStore } from '../../store/auth.js'
import { createTrustedHTML } from '../../utils/trustedTypes.js'
import { addToCart } from '../cart.js'
import { getCsrfToken } from '../../utils/csrf.js'

export default async function render(container) {
  // Extract product ID from URL hash
  const pathParts = location.hash.slice(1).split('/')
  const productId = pathParts.at(-1)

  if (!productId || Number.isNaN(productId)) {
    container.innerHTML = createTrustedHTML(`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ ID de produit invalide</p>
        <a href="#/products" class="text-blue-600 hover:underline text-sm mt-2 inline-block">
          ← Retour aux produits
        </a>
      </div>
    `)
    return
  }

  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-4">
        <a href="#/products" class="text-blue-600 hover:underline text-sm">
          ← Retour aux produits
        </a>
      </div>

      <div id="product-detail">
        <p class="text-gray-500">Chargement...</p>
      </div>
    </div>
  `)

  await loadProductDetail(productId)
}

async function loadProductDetail(productId) {
  const container = document.querySelector('#product-detail')

  try {
    const response = await getProductById(productId)
    const product = response.product

    if (!product) {
      container.innerHTML = createTrustedHTML(`
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600 font-semibold">❌ Produit non trouvé</p>
          <a href="#/products" class="text-blue-600 hover:underline text-sm mt-2 inline-block">
            ← Retour aux produits
          </a>
        </div>
      `)
      return
    }

    container.innerHTML = createTrustedHTML(`
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">${product.name}</h1>
              <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                ${product.category}
              </span>
            </div>
            <div class="text-right">
              <p class="text-3xl font-bold text-green-600">${product.price.toFixed(2)} €</p>
            </div>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Description</h2>
            <p class="text-gray-600 leading-relaxed">${product.description}</p>
          </div>

          ${
            product.images && product.images.length > 0
              ? `
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-3">Images</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${product.images
                  .map(
                    (image) => `
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="${image.url}" alt="${product.name}" class="w-full h-48 object-cover">
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          <div class="flex justify-between items-center pt-6 border-t border-gray-200">
            <div class="flex gap-3">
              ${
                authStore.isAuthenticated()
                  ? `
                <button class="add-to-cart-btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                  🛒 Ajouter au panier
                </button>
                <a href="#/products/${product.id}/edit" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition inline-block cursor-pointer">
                  ✏️ Modifier
                </a>
                <button data-delete-id="${product.id}" class="delete-btn bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer">
                  🗑️ Supprimer
                </button>
              `
                  : `
                <button class="add-to-cart-btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                  🛒 Ajouter au panier
                </button>
              `
              }
            </div>
          </div>
        </div>
      </div>
    `)

    const deleteBtn = container.querySelector('.delete-btn')
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        const productId = deleteBtn.dataset.deleteId
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
          return
        }

        try {
          const csrfToken = await getCsrfToken()
          await deleteProduct(productId, csrfToken)
          alert('✅ Produit supprimé avec succès')
          location.hash = '#/products'
        } catch (error) {
          alert('❌ Erreur lors de la suppression: ' + error.message)
        }
      })
    }

    // Add to cart buttons
    const addToCartButtons = container.querySelectorAll('.add-to-cart-btn')
    addToCartButtons.forEach((btn) => {
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
    })
  } catch (error) {
    container.innerHTML = createTrustedHTML(`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ Erreur lors du chargement du produit</p>
      </div>
    `)
    console.error(error)
  }
}
