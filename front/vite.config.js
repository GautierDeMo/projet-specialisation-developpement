import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'csp-nonce',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const nonce = crypto.randomBytes(16).toString('base64')

          // Stocker le nonce dans res.locals
          res.locals = res.locals || {}
          res.locals.nonce = nonce

          res.setHeader(
            'Content-Security-Policy',
            [
              "default-src 'self'",
              `script-src 'self' 'nonce-${nonce}'`,
              "style-src 'self' 'unsafe-inline'",
              `script-src-attr 'none'`,
              "img-src 'self' data: https:",
              "connect-src 'self' http://localhost:3000",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
              "require-trusted-types-for 'script'",
              'trusted-types default',
              'report-uri http://localhost:3000/api/csp/report',
            ].join('; ')
          )

          next()
        })
      },
      transformIndexHtml: {
        order: 'post',
        handler(html, ctx) {
          // Générer un nouveau nonce pour chaque transformation
          const nonce = crypto.randomBytes(16).toString('base64')

          // Ajouter manuellement nonce à TOUS les scripts
          html = html.replace(/<script/g, `<script nonce="${nonce}"`)

          // Ajouter meta tag CSP nonce
          html = html.replace(
            '</head>',
            `  <meta property="csp-nonce" nonce="${nonce}">\n  </head>`
          )

          return html
        },
      },
    },
  ],
  server: {
    port: process.env.PORT || 5000,
  },
})
