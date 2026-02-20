const routes = {
  '/': () => import('./pages/home.js'),
  '/stats': () => import('./pages/stats.js'),
  '/csp-reports': () => import('./pages/cspReports.js'), // Juste ajouter la ligne
}

export async function navigate() {
  const path = location.hash.slice(1) || '/'
  const loader = routes[path]
  const app = document.getElementById('app')

  if (loader) {
    const { default: render } = await loader() // Tout le monde est "default" maintenant
    render(app)
  } else {
    app.innerHTML = '<h1>404</h1>'
  }
}

globalThis.addEventListener('hashchange', navigate)
