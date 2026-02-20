import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { getSSLConfig } from './src/config/ssl.config.js'

dotenv.config()

export default defineConfig(async () => {
  const { https, protocol } = await getSSLConfig()
  const backendUrl = `${protocol}://localhost:3000`

  return {
    plugins: [
      tailwindcss(),

      {
        name: 'security-headers',

        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const isHttps = req.connection.encrypted || protocol === 'https'

            if (isHttps) {
              res.setHeader(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
              )
            }
            next()
          })

          server.middlewares.use((req, res, next) => {
            const nonce = crypto.randomBytes(16).toString('base64')
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
                `connect-src 'self' ${backendUrl}`,
                "font-src 'self' data:",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'none'",
                'upgrade-insecure-requests',
                // "require-trusted-types-for 'script'",
                // 'trusted-types default',
                `report-uri ${backendUrl}/api/csp/report`,
              ].join('; ')
            )
            next()
          })
        },

        transformIndexHtml: {
          order: 'post',
          handler(html) {
            const nonce = crypto.randomBytes(16).toString('base64')
            html = html.replace(/<script/g, `<script nonce="${nonce}"`)
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
      https,
    },
  }
})
