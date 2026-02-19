import { renderCspReports } from './pages/cspReports.js'
import { createTrustedHTML } from './utils/trustedTypes.js'
import { navigate } from './router.js'

if (window.location.pathname === '/csp-reports') {
  renderCspReports()
}

// Exemple de code pour tester Trusted Types à mettre absolument partout quand il doit avoir innerHTML dynamique, ou du code HTML qui vient de l'extérieur (ex: commentaires, contenu d'une API, etc.)
document.querySelector('#app').innerHTML = createTrustedHTML(html)
setupCounter(document.querySelector('#counter'))

try {
  await navigate()
} catch (error) {
  console.error(error)
}
