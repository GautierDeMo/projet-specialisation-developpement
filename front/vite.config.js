import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import { getSSLConfig } from './src/config/ssl.config.js'
import { securityPlugin } from './plugins/security.plugin.js'

dotenv.config()

export default defineConfig(async () => {
  const { https, protocol } = await getSSLConfig()
  const backendHost = process.env.VITE_API_URL || 'localhost:3000'
  const backendUrl = `${protocol}://${backendHost}`

  return {
    plugins: [tailwindcss(), securityPlugin({ protocol, backendUrl })],

    server: {
      port: process.env.PORT || 5000,
      https,
    },
  }
})
