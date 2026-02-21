import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import { getSSLConfig, getFrontendUrl } from './src/config/ssl.config.js'
import { securityPlugin } from './plugins/security.plugin.js'

dotenv.config()

export default defineConfig(async () => {
  console.log('📝 Démarrage de la config Vite...')

  const sslResult = await getSSLConfig()
  const { https, protocol } = sslResult

  if (!protocol) {
    throw new Error('❌ protocol est undefined ! Vérifier ssl.config.js')
  }

  console.log('✅ Protocol détecté:', protocol)

  const backendHost = process.env.VITE_API_URL || 'localhost:3000'
  const backendUrl = `${protocol}://${backendHost}`
  const frontendUrl = getFrontendUrl(protocol)

  return {
    plugins: [
      tailwindcss(),
      securityPlugin({ protocol, backendUrl, frontendUrl }),
    ],

    server: {
      port: process.env.PORT || 5000,
      https,
    },
  }
})
