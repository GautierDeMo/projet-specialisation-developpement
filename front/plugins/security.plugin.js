import crypto from 'node:crypto'

function createHstsMiddleware(protocol) {
  return (req, res, next) => {
    const isHttps = req.connection.encrypted || protocol === 'https'

    if (isHttps) {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }
    next()
  }
}

function createCspMiddleware(backendUrl, frontendUrl) {
  return (req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64')

    res.locals = res.locals || {}
    res.locals.nonce = nonce

    const wsUrl = frontendUrl.replace('https:', 'wss:').replace('http:', 'ws:')
    const backendOrigin = backendUrl.replace(/\/api.*$/, '')

    res.setHeader(
      'Content-Security-Policy',
      [
        `default-src ${frontendUrl}`,
        // ❌ 'strict-dynamic' est retiré car il désactive la liste blanche des domaines (host-based allowlisting).
        // Vite a besoin de charger des modules ES en cascade (comme @vite/client) qui ne possèdent pas de nonce
        // lors du développement. On utilise donc uniquement le nonce et l'URL source pour la compatibilité.
        `script-src ${frontendUrl} 'nonce-${nonce}' 'unsafe-inline'`,
        `style-src ${frontendUrl} 'unsafe-inline'`,
        "script-src-attr 'none'",
        `img-src ${frontendUrl} data: https:`,
        `connect-src ${frontendUrl} ${wsUrl} ${backendOrigin}`,
        `font-src ${frontendUrl} data:`,
        "object-src 'none'",
        `base-uri ${frontendUrl}`,
        `form-action ${frontendUrl}`,
        "frame-ancestors 'none'",
        'upgrade-insecure-requests',
        "require-trusted-types-for 'script'",
        'trusted-types default',
        `report-uri ${backendUrl}/csp/report`,
      ].join('; ')
    )
    next()
  }
}

function injectNoncesIntoHtml(html) {
  const nonce = crypto.randomBytes(16).toString('base64')

  html = html.replaceAll('<script', `<script nonce="${nonce}"`)

  html = html.replace(
    '</head>',
    `  <meta property="csp-nonce" content="${nonce}">\n  </head>`
  )

  return html
}

export function securityPlugin({ protocol, backendUrl, frontendUrl }) {
  return {
    name: 'vite-plugin-security',

    configureServer(server) {
      server.middlewares.use(createHstsMiddleware(protocol))
      server.middlewares.use(createCspMiddleware(backendUrl, frontendUrl))
    },

    transformIndexHtml: {
      order: 'post',
      handler: injectNoncesIntoHtml,
    },
  }
}
