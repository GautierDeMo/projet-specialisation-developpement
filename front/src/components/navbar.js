import { authStore } from '../store/auth.js'
import { logout } from '../api/auth.js'

export function renderNavbar() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  if (!authStore.isAuthenticated()) {
    navbar.innerHTML = ''
    return
  }

  const user = authStore.getUser()
  const email = user?.email ?? 'Connecté'

  navbar.innerHTML = `
    <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <span class="text-sm text-gray-600">${email}</span>
      <button id="logout-btn" class="text-sm text-red-600 hover:underline font-medium">
        Se déconnecter
      </button>
    </nav>
  `

  navbar.querySelector('#logout-btn').addEventListener('click', async () => {
    await logout()
    location.hash = '#/login'
  })
}
