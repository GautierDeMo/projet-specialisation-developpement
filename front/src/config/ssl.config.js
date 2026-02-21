import devcert from 'devcert'
import dotenv from 'dotenv'

dotenv.config()

export async function getSSLConfig() {
  try {
    console.log('🔒 Génération des certificats SSL avec devcert...')
    const ssl = await devcert.certificateFor('localhost', {
      skipCertutil: true,
    })

    console.log('✅ Certificats SSL générés avec succès')

    return {
      https: { key: ssl.key, cert: ssl.cert },
      protocol: 'https',
    }
  } catch (error) {
    console.warn(
      '⚠️  Impossible de générer les certificats SSL:',
      error.message
    )
    console.log('⚠️  Démarrage en HTTP')

    return {
      https: false,
      protocol: 'http',
    }
  }
}

export function getFrontendUrl(protocol) {
  const port = process.env.PORT || 5000
  return `${protocol}://localhost:${port}`
}
