import { authStore } from '../store/auth.js'
import { logout } from '../api/auth.js'

export function renderNavbar() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  if (!authStore.isAuthenticated()) {
    navbar.innerHTML = `
      <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <a href="#/" class="text-sm text-gray-700 hover:underline font-medium">
          Retour accueil
        </a>
        <a href="#/login" class="text-sm text-blue-700 hover:underline font-medium">
          Se connecter
        </a>
      </nav>
    `
    return
  }

  const user = authStore.getUser()
  const email = user?.email ?? 'Connecté'

  navbar.innerHTML = `
    <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="#/" class="text-sm text-gray-700 hover:underline font-medium">
          Retour accueil
        </a>
        <span class="text-sm text-gray-600">${email}</span>
      </div>
      <button id="logout-btn" class="text-sm text-red-700 hover:underline font-medium">
        Se déconnecter
      </button>
    </nav>
  `

  navbar.querySelector('#logout-btn').addEventListener('click', async (e) => {
    e.preventDefault()
    await logout()
    location.hash = '#/login'
  })
}
