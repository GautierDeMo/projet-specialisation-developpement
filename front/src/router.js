import { authStore } from './store/auth.js'
import { renderNavbar } from './components/navbar.js'
import { createTrustedHTML } from './utils/trustedTypes.js'

const routes = {
  '/': { loader: () => import('./pages/home.js') },
  '/stats': { loader: () => import('./pages/stats.js') },
  '/csp-reports': {
    loader: () => import('./pages/cspReports.js'),
    guard: 'auth',
  },
  '/login': { loader: () => import('./pages/login.js'), guard: 'guest' },
  '/register': { loader: () => import('./pages/register.js'), guard: 'guest' },
}

function matchRoute(path) {
  return routes[path] || null
}

export async function navigate() {
  const app = document.getElementById('app')
  const path = location.hash.slice(1) || '/'
  const route = matchRoute(path)

  if (!route) {
    app.innerHTML = createTrustedHTML(
      '<h1 class="text-2xl font-bold text-center text-red-700 p-10">404 - Page introuvable</h1>' +
        '<div class="mt-12 flex justify-center">\n' +
        '<a href="#/" class="text-gray-700 italic font-semibold hover:underline">\n' +
        'Retour accueil\n        ' +
        '</a>\n      ' +
        '</div>\n'
    )
    return
  }

  // Guard: 'guest' routes redirect authenticated users to home
  if (route.guard === 'guest' && authStore.isAuthenticated()) {
    location.hash = '#/'
    return
  }

  // Guard: 'auth' routes redirect unauthenticated users to login
  if (route.guard === 'auth' && !authStore.isAuthenticated()) {
    location.hash = '#/login'
    return
  }

  const { default: render } = await route.loader()

  renderNavbar()
  await render(app)
}

globalThis.addEventListener('hashchange', navigate)
