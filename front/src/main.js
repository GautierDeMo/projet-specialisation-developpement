import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { renderCspReports } from './pages/cspReports.js'
import { createTrustedHTML } from './utils/trustedTypes.js' // ← AJOUTER

if (window.location.pathname === '/csp-reports') {
  renderCspReports()
} else {
  const html = `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <button id="counter" type="button"></button>
        <a href="/csp-reports" class="block mt-4">📊 Rapports CSP</a>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `

  document.querySelector('#app').innerHTML = createTrustedHTML(html) // ← MODIFIER
  setupCounter(document.querySelector('#counter'))
}
