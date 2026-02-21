import { createTrustedHTML } from '../utils/trustedTypes.js'
import { authStore } from '../store/auth.js'

export default function render(container) {
  const isAuthenticated = authStore.isAuthenticated()

  const html = `
    <div class="flex justify-center bg-blue-50 min-h-screen pt-10">
      <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
          Bienvenue sur notre boutique
        </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- Produits -->
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">📦</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Produits</h2>
            <p class="text-gray-600 text-center mb-4">Découvrez notre catalogue de produits variés</p>
            <div class="space-y-2">
              <a href="#/products" class="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition">
                Voir les produits
              </a>
              ${
                isAuthenticated
                  ? `
              <a href="#/products/create" class="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition">
                Ajouter un produit
              </a>`
                  : ''
              }
            </div>
          </div>

          <!-- Panier -->
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">🛒️</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Panier</h2>
            <p class="text-gray-600 text-center mb-4">Consultez votre panier d'achat</p>
            <a href="#/cart" class="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition">
              Voir le panier
            </a>
          </div>

          <!-- Statistiques -->
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">📊</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Statistiques</h2>
            <p class="text-gray-600 text-center mb-4">Consultez les statistiques par catégorie</p>
            <a href="#/stats" class="block w-full bg-purple-500 text-white text-center py-2 rounded hover:bg-purple-600 transition">
              Voir les stats
            </a>
          </div>
          
           <!-- CSP Reports (uniquement pour connectés) -->
          ${
            isAuthenticated
              ? `
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">🛡️</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Sécurité</h2>
            <p class="text-gray-600 text-center mb-4">Consultez les rapports de sécurité CSP</p>
            <a href="#/csp-reports" class="block w-full bg-gray-800 text-white text-center py-2 rounded hover:bg-gray-700 transition">
              Rapports CSP
            </a>
          </div>`
              : ''
          }

          <!-- Dashboard -->
          ${
            isAuthenticated
              ? `
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">👤</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Mon Compte</h2>
            <p class="text-gray-600 text-center mb-4">Accédez à votre tableau de bord</p>
            <a href="#/dashboard" class="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition">
              Dashboard
            </a>
          </div>`
              : `
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="text-center mb-4">
              <span class="text-4xl">🔐</span>
            </div>
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-3">Connexion</h2>
            <p class="text-gray-600 text-center mb-4">Connectez-vous pour accéder à plus de fonctionnalités</p>
            <a href="#/login" class="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition">
              Se connecter
            </a>
          </div>`
          }
        </div>
      </div>
    </div>
  `
  container.innerHTML = createTrustedHTML(html)
}
