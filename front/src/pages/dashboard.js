import { authStore } from '../store/auth.js'
import { createTrustedHTML } from '../utils/trustedTypes.js'

export default function render(container) {
  const user = authStore.getUser()

  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">👤 Tableau de bord</h1>
        <p class="text-gray-600 mt-2">Bienvenue, ${user?.email || 'Utilisateur'}!</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Gestion des produits -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 p-3 rounded-full">
              <span class="text-2xl">📦</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 ml-3">Produits</h2>
          </div>
          <p class="text-gray-600 mb-4">Gérez votre catalogue de produits</p>
          <div class="space-y-2">
            <a href="#/products" class="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition">
              Voir tous les produits
            </a>
            <a href="#/products/create" class="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition">
              Ajouter un produit
            </a>
          </div>
        </div>
        
          <!-- Panier (placeholder) -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div class="flex items-center mb-4">
            <div class="bg-green-100 p-3 rounded-full">
              <span class="text-2xl">🛍️</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 ml-3">Panier</h2>
          </div>
          <p class="text-gray-600 mb-4">Consultez votre panier d'achat</p>
          <button class="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition opacity-50 cursor-not-allowed" disabled>
            Bientôt disponible
          </button>
        </div>


        <!-- Statistiques -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div class="flex items-center mb-4">
            <div class="bg-purple-100 p-3 rounded-full">
              <span class="text-2xl">📊</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 ml-3">Statistiques</h2>
          </div>
          <p class="text-gray-600 mb-4">Consultez les statistiques des ventes</p>
          <a href="#/stats" class="block w-full bg-purple-500 text-white text-center py-2 rounded hover:bg-purple-600 transition">
            Voir les statistiques
          </a>
        </div>

        <!-- Sécurité -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div class="flex items-center mb-4">
            <div class="bg-red-100 p-3 rounded-full">
              <span class="text-2xl">🔒</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 ml-3">Sécurité</h2>
          </div>
          <p class="text-gray-600 mb-4">Consultez les rapports de sécurité</p>
          <a href="#/csp-reports" class="block w-full bg-red-500 text-white text-center py-2 rounded hover:bg-red-600 transition">
            Rapports CSP
          </a>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="mt-8 flex justify-center gap-4">
        <a href="#/" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-medium">
          🏠 Accueil
        </a>
      </div>
    </div>
  `)
}
