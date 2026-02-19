const fetchStats = async () => {
  const response = await fetch('http://localhost:3000/api/stats')
  return await response.json()
}

export default async function render(container) {
  container.innerHTML = `
    <div class="bg-blue-50 min-h-screen py-10">
      <h1 class="text-3xl font-bold mb-10 text-center text-gray-700">
        Statistiques des produits
      </h1>

      <div id="stats"
           class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
      </div>
      
      <div class="mt-12 flex justify-center">
        <a href="#/" class="text-gray-700 italic font-semibold hover:underline">
           Retour accueil
        </a>
      </div>
    </div>
  `

  const stats = await fetchStats()
  const statsContainer = document.getElementById('stats')

  stats.forEach(({ nom, compte }) => {
    const card = document.createElement('div')
    card.className =
      'bg-white text-center p-6 rounded-lg shadow hover:shadow-lg transition'

    card.innerHTML = `
      <h2 class="text-xl font-semibold mb-2 text-gray-700">${nom}</h2>
      <p class="text-gray-500">${compte} produits</p>
    `

    statsContainer.appendChild(card)
  })
}
