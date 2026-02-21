import { isHttps } from '../config/server.config.js'
import { createCsrfProtection } from '../config/csrf.config.js'

export function setupSecurity(app) {
  const { generateCsrfToken, doubleCsrfProtection } =
    createCsrfProtection(isHttps())

  global.csrfGenerateToken = generateCsrfToken

  app.use(doubleCsrfProtection)
}
