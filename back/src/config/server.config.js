import https from 'node:https'
import http from 'node:http'
import devcert from 'devcert'

export async function createServer(app, port) {
  try {
    console.log('🔒 Génération des certificats SSL avec devcert...')

    const ssl = await devcert.certificateFor('localhost', {
      skipCertutil: true,
    })

    const server = https.createServer(ssl, app)

    server.listen(port, () => {
      console.log(`✅ Backend HTTPS listening on https://localhost:${port}`)
      console.log('🔒 HSTS activé')
    })

    return server
  } catch (error) {
    console.error('❌ Erreur avec devcert:', error.message)
    console.log('⚠️  Fallback sur HTTP...')

    const server = http.createServer(app)

    server.listen(port, () => {
      console.log(`⚠️  Backend HTTP listening on http://localhost:${port}`)
      console.log('⚠️  HSTS désactivé (pas de certificats SSL)')
    })

    return server
  }
}
