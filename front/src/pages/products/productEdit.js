import {
  getProductById,
  updateProduct,
  addImageToProduct,
} from '../../api/product.js'
import { createTrustedHTML } from '../../utils/trustedTypes.js'
import { getCsrfToken } from '../../utils/csrf.js'

export default async function render(container) {
  // Extract product ID from URL hash
  const pathParts = location.hash.slice(1).split('/')
  const productId = pathParts.at(-2) // /products/{id}/edit

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
    <div class="container mx-auto p-6 max-w-2xl">
      <div class="mb-6">
        <a href="#/products/${productId}" class="text-blue-600 hover:underline text-sm">
          ← Retour au produit
        </a>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">✏️ Modifier le produit</h1>
        
        <div id="loading" class="text-gray-500">Chargement du produit...</div>
        
        <form id="product-form" class="space-y-6 hidden">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              id="name"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              id="category"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="Alimentation">Alimentation</option>
              <option value="Ameublement">Ameublement</option>
              <option value="Électronique">Électronique</option>
              <option value="Hygiène">Hygiène</option>
              <option value="Jardin">Jardin</option>
              <option value="Ménage">Ménage</option>
              <option value="Sport">Sport</option>
              <option value="Vêtements">Vêtements</option>
            </select>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
              Prix (€) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
             Ajouter l'URL d'une image (optionnel)
            </label>
            <input
              id="imageUrl"
              type="url"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div id="error-message" class="hidden bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600 font-semibold">❌ Erreur</p>
            <p class="text-red-500 text-sm mt-1"></p>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              id="submit-btn"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
            >
              Enregistrer les modifications
            </button>
            <a
              href="#/products/${productId}"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg text-center transition-colors inline-block cursor-pointer"
            >
              Annuler
            </a>
          </div>
        </form>
      </div>
    </div>
  `)

  await loadProductForEdit(productId)
}

async function loadProductForEdit(productId) {
  try {
    const response = await getProductById(productId)
    const product = response.product

    if (!product) {
      document.querySelector('#loading').innerHTML = createTrustedHTML(`
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600 font-semibold">❌ Produit non trouvé</p>
          <a href="#/products" class="text-blue-600 hover:underline text-sm mt-2 inline-block">
            ← Retour aux produits
          </a>
        </div>
      `)
      return
    }

    // Populate form fields
    document.querySelector('#name').value = product.name
    document.querySelector('#category').value = product.category
    document.querySelector('#price').value = product.price
    document.querySelector('#description').value = product.description

    // Show form, hide loading
    document.querySelector('#loading').classList.add('hidden')
    document.querySelector('#product-form').classList.remove('hidden')

    // Add form submit handler
    const form = document.querySelector('#product-form')
    const errorMessage = document.querySelector('#error-message')
    const submitBtn = document.querySelector('#submit-btn')

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      errorMessage.classList.add('hidden')
      submitBtn.disabled = true
      submitBtn.textContent = 'Modification en cours...'

      const productData = {
        name: document.querySelector('#name').value.trim(),
        category: document.querySelector('#category').value,
        price: Number.parseFloat(document.querySelector('#price').value),
        description: document.querySelector('#description').value.trim(),
      }

      const imageUrl = document.querySelector('#imageUrl').value.trim()

      try {
        const csrfToken = await getCsrfToken()
        await updateProduct(productId, productData, csrfToken)

        // If there's a new image URL, add it to the product
        if (imageUrl) {
          try {
            await addImageToProduct(productId, { imageUrl }, csrfToken)
          } catch (imageError) {
            console.warn('Failed to add image:', imageError)
            // Don't fail the whole operation if image addition fails
          }
        }

        alert('✅ Produit modifié avec succès!')
        location.hash = `#/products/${productId}`
      } catch (error) {
        errorMessage.querySelector('p:last-child').textContent = error.message
        errorMessage.classList.remove('hidden')
      } finally {
        submitBtn.disabled = false
        submitBtn.textContent = 'Enregistrer les modifications'
      }
    })
  } catch (error) {
    document.querySelector('#loading').innerHTML = createTrustedHTML(`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ Erreur lors du chargement du produit</p>
        <p class="text-red-500 text-sm mt-2">${error.message}</p>
        <a href="#/products" class="text-blue-600 hover:underline text-sm mt-2 inline-block">
          ← Retour aux produits
        </a>
      </div>
    `)
  }
}
