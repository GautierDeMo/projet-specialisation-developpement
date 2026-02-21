import { csp } from '../api/csp.js'
import { createTrustedHTML } from '../utils/trustedTypes.js'

export default async function renderCspReports() {
  const app = document.querySelector('#app')

  const initialHTML = `
    <div class="container mx-auto p-6 max-w-6xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">📊 Rapports CSP</h1>
        <button id="deleteAllBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          🗑️ Supprimer tous les rapports
        </button>
      </div>
      
      <div id="reports-container">
        <p class="text-gray-500">Chargement...</p>
      </div>
    </div>
  `

  app.innerHTML = createTrustedHTML(initialHTML)

  await loadReports()

  document
    .getElementById('deleteAllBtn')
    ?.addEventListener('click', async () => {
      if (confirm('Êtes-vous sûr de vouloir supprimer tous les rapports ?')) {
        try {
          await csp.deleteAllReports()
          alert('✅ Rapports supprimés avec succès')
          await loadReports()
        } catch (error) {
          alert('❌ Erreur lors de la suppression')
          console.error(error)
        }
      }
    })
}

async function loadReports() {
  const container = document.querySelector('#reports-container')

  try {
    const reports = await csp.getReports()

    let html = ''

    if (reports.length === 0) {
      html = `
        <div class="text-center py-12 bg-green-50 rounded-lg">
          <p class="text-2xl mb-2">🎉</p>
          <p class="text-gray-600 text-lg">Aucune violation CSP détectée.</p>
          <p class="text-gray-500 text-sm mt-2">Votre application est sécurisée !</p>
        </div>
      `
    } else {
      html = `
        <div class="mb-4 text-sm text-gray-600">
          ${reports.length} violation(s) détectée(s)
        </div>
        <div class="space-y-4">
          ${reports
            .map(
              (report) => `
            <div class="border border-red-200 rounded-lg p-4 bg-white shadow hover:shadow-md transition">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-semibold text-red-600 flex items-center gap-2">
                  ⚠️ Violation CSP
                </h3>
                <span class="text-sm text-gray-500">${new Date(
                  report.createdAt
                ).toLocaleString('fr-FR')}</span>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-start gap-2">
                  <strong class="text-gray-700 min-w-[140px]">Page :</strong> 
                  <code class="bg-gray-100 px-2 py-1 rounded text-xs flex-1 break-all">${
                    report.documentUri
                  }</code>
                </div>
                
                <div class="flex items-start gap-2">
                  <strong class="text-gray-700 min-w-[140px]">Directive violée :</strong> 
                  <code class="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-mono">${
                    report.violatedDirective
                  }</code>
                </div>
                
                <div class="flex items-start gap-2">
                  <strong class="text-gray-700 min-w-[140px]">Ressource bloquée :</strong> 
                  <code class="bg-gray-100 px-2 py-1 rounded text-xs flex-1 break-all">${
                    report.blockedUri
                  }</code>
                </div>
                
                <details class="mt-3">
                  <summary class="cursor-pointer text-blue-600 hover:underline font-medium">
                    📄 Voir le rapport complet JSON
                  </summary>
                  <pre class="mt-2 bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">${JSON.stringify(
                    JSON.parse(report.rawReport),
                    null,
                    2
                  )}</pre>
                </details>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `
    }

    container.innerHTML = createTrustedHTML(html)
  } catch (error) {
    const errorHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 font-semibold">❌ Erreur lors du chargement des rapports</p>
        <p class="text-red-500 text-sm mt-2">${error.message}</p>
      </div>
    `
    container.innerHTML = createTrustedHTML(errorHTML)
    console.error(error)
  }
}
