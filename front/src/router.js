const routes = {
  '/': () => import('./pages/home.js'),
  '/stats': () => import('./pages/stats.js'),
}

function matchRoute(path) {
  return routes[path] || null
}

export async function navigate() {
  const path = location.hash.slice(1) || '/'
  const loader = matchRoute(path)

  const app = document.getElementById('app')

  if (!loader) {
    app.innerHTML =
      '<h1 class="text-2xl font-bold text-center text-red-700 p-10">404 - Page introuvable</h1>' +
      '<div class="mt-12 flex justify-center">\n' +
      '<a href="#/" class="text-gray-700 italic font-semibold hover:underline">\n' +
      'Retour accueil\n        ' +
      '</a>\n      ' +
      '</div>\n'
    return
  }

  const { default: render } = await loader()
  render(app)
}

globalThis.addEventListener('hashchange', navigate)
