import crypto from 'crypto'

// Fonction pour créer le middleware HSTS
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

// Fonction pour créer le middleware CSP
function createCspMiddleware(backendUrl) {
  return (req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64')

    res.locals = res.locals || {}
    res.locals.nonce = nonce

    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}'`,
        "style-src 'self' 'unsafe-inline'",
        "script-src-attr 'none'",
        "img-src 'self' data: https:",
        `connect-src 'self' ${backendUrl}`,
        "font-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        'upgrade-insecure-requests',
        "require-trusted-types-for 'script'",
        'trusted-types default',
        `report-uri ${backendUrl}/api/csp/report`,
      ].join('; ')
    )
    next()
  }
}

// Fonction pour injecter les nonces dans le HTML
function injectNoncesIntoHtml(html) {
  const nonce = crypto.randomBytes(16).toString('base64')

  html = html.replace(/<script/g, `<script nonce="${nonce}"`)

  html = html.replace(
    '</head>',
    `  <meta property="csp-nonce" content="${nonce}">\n  </head>`
  )

  return html
}

// Plugin de sécurité pour Vite
export function securityPlugin({ protocol, backendUrl }) {
  return {
    name: 'vite-plugin-security',

    configureServer(server) {
      server.middlewares.use(createHstsMiddleware(protocol))
      server.middlewares.use(createCspMiddleware(backendUrl))
    },

    transformIndexHtml: {
      order: 'post',
      handler: injectNoncesIntoHtml,
    },
  }
}
