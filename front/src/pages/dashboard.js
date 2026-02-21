import { authStore } from '../store/auth.js'
import { createTrustedHTML } from '../utils/trustedTypes.js'

export default function render(container) {
  const user = authStore.getUser()

  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        <p class="text-gray-600 mt-30 font-bold italic text-lg text-center">Bienvenue, ${user?.email || 'Utilisateur'}!</p>
      </div>
    </div>
  `)
}
