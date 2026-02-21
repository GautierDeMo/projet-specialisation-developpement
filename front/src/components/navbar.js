import { authStore } from '../store/auth.js'
import { logout } from '../api/auth.js'
import { createTrustedHTML } from '../utils/trustedTypes.js'

export function renderNavbar() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  if (!authStore.isAuthenticated()) {
    navbar.innerHTML = createTrustedHTML(`
      <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <a href="#/" class="text-sm text-gray-700 hover:underline font-medium">
            🏠 Accueil
          </a>
          <a href="#/products" class="text-sm text-gray-700 hover:underline font-medium">
            📦 Produits
          </a>
          <a href="#/cart" class="text-sm text-gray-700 hover:underline font-medium">
            🛒 Panier
          </a>
          <a href="#/stats" class="text-sm text-gray-700 hover:underline font-medium">
            📊 Stats
          </a>
        </div>
        <div class="flex items-center gap-3">
          <a href="#/login" class="text-sm text-blue-700 hover:underline font-medium">
            Se connecter
          </a>
          <a href="#/register" class="text-sm text-green-700 hover:underline font-medium">
            S'inscrire
          </a>
        </div>
      </nav>
    `)
    return
  }

  const user = authStore.getUser()
  const email = user?.email ?? 'Connecté'

  navbar.innerHTML = createTrustedHTML(`
    <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="#/" class="text-sm text-gray-700 hover:underline font-medium">
          🏠 Accueil
        </a>
        <a href="#/products" class="text-sm text-gray-700 hover:underline font-medium">
          📦 Produits
        </a>
        <a href="#/cart" class="text-sm text-gray-700 hover:underline font-medium">
          🛒 Panier
        </a>
        <a href="#/dashboard" class="text-sm text-gray-700 hover:underline font-medium">
          👤 Dashboard
        </a>
        <a href="#/stats" class="text-sm text-gray-700 hover:underline font-medium">
          📊 Stats
        </a>
        <a href="#/csp-reports" class="text-sm text-gray-700 hover:underline font-medium">
          🔒 CSP
        </a>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600">${email}</span>
        <button id="logout-btn" class="text-sm text-red-700 hover:underline font-medium">
          Se déconnecter
        </button>
      </div>
    </nav>
  `)

  navbar.querySelector('#logout-btn').addEventListener('click', async (e) => {
    e.preventDefault()
    await logout()
    location.hash = '#/login'
  })
}
