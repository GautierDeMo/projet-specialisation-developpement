import { createProduct } from '../../api/product.js'
import { createTrustedHTML } from '../../utils/trustedTypes.js'
import { getCsrfToken } from '../../utils/csrf.js'

export default function render(container) {
  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-2xl">
      <div class="mb-6">
        <a href="#/products" class="text-blue-600 hover:underline text-sm">
          ← Retour aux produits
        </a>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">➕ Ajouter un nouveau produit</h1>

        <form id="product-form" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              id="name"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Râteau en plastique"
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
              <option value="Autre">Autre</option>
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
              placeholder="13.50"
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
              placeholder="Décrivez votre produit en détail..."
            ></textarea>
          </div>

          <div>
            <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
              URL de l'image (optionnel)
            </label>
            <input
              id="imageUrl"
              type="url"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <p class="text-sm text-gray-500 mt-1">
              Vous pouvez ajouter une image maintenant ou plus tard
            </p>
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
              Créer le produit
            </button>
            <a
              href="#/products"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg text-center transition-colors inline-block cursor-pointer"
            >
              Annuler
            </a>
          </div>
        </form>
      </div>
    </div>
  `)

  const form = container.querySelector('#product-form')
  const errorMessage = container.querySelector('#error-message')
  const submitBtn = container.querySelector('#submit-btn')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorMessage.classList.add('hidden')
    submitBtn.disabled = true
    submitBtn.textContent = 'Création en cours...'

    const productData = {
      name: container.querySelector('#name').value.trim(),
      category: container.querySelector('#category').value,
      price: Number.parseFloat(container.querySelector('#price').value),
      description: container.querySelector('#description').value.trim(),
    }
    const imageUrl = container.querySelector('#imageUrl').value.trim()

    if (imageUrl) {
      productData.image = {
        url: imageUrl
      }
    }
    try {
      const csrfToken = await getCsrfToken()
      await createProduct(productData, csrfToken)

      alert('✅ Produit créé avec succès!')
      location.hash = '#/products'
    } catch (error) {
      errorMessage.querySelector('p:last-child').textContent = error.message
      errorMessage.classList.remove('hidden')
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Créer le produit'
    }
  })
}
