import { fetchStats } from '../api/stats.js'
// N'oublie pas l'import de l'utilitaire !
import { createTrustedHTML } from '../utils/trustedTypes.js'

export default async function render(container) {
  // On utilise createTrustedHTML pour injecter le squelette de la page
  container.innerHTML = createTrustedHTML(`
    <div class=" min-h-screen py-10">
      <h1 class="text-3xl font-bold mb-10 text-center text-gray-700">
        Statistiques des produits
      </h1>

      <div id="stats"
           class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
      </div>
    </div>
  `)

  const stats = await fetchStats()
  const statsContainer = document.getElementById('stats')

  stats.forEach(({ nom, compte }) => {
    const card = document.createElement('div')
    card.className =
      'bg-white text-center p-6 rounded-lg shadow hover:shadow-lg transition'

    const cardHTML = `
      <h2 class="text-xl font-semibold mb-2 text-gray-700">${nom}</h2>
      <p class="text-gray-500">${compte} produit${compte > 1 ? 's' : ''}</p>
    `
    card.innerHTML = createTrustedHTML(cardHTML)

    statsContainer.appendChild(card)
  })
}
