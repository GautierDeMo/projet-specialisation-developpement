import { createTrustedHTML } from '../utils/trustedTypes.js'
import { authStore } from '../store/auth.js'

export default function render(container) {
  const isAuthenticated = authStore.isAuthenticated()
  
  const html = `
    <div class="flex flex-col items-center justify-center bg-blue-50 min-h-screen pt-10 gap-6">
      <h1 class="text-3xl font-bold text-gray-800">Tableau de bord</h1>
      
      <div class="flex flex-col gap-4">
        <a href="#/stats" class="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md text-gray-700 font-semibold text-center transition border border-blue-100">
           📊 Voir les statistiques des produits
        </a>

        ${isAuthenticated ? `
        <a href="#/csp-reports" class="bg-gray-800 px-6 py-3 rounded-lg shadow hover:shadow-md text-white font-semibold text-center transition hover:bg-gray-700">
           🛡️ Consulter les rapports CSP
        </a>
        ` : ''}
      </div>
    </div>
  `
  container.innerHTML = createTrustedHTML(html)
}
