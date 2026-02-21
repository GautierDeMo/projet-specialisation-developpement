import { doubleCsrf } from 'csrf-csrf'

const CSRF_SECRET = process.env.CSRF_SECRET || 'secret_key'

export function createCsrfProtection(isHttps) {
  return doubleCsrf({
    getSecret: () => CSRF_SECRET,
    getSessionIdentifier: (req) => req.cookies.sessionID || 'default-session',
    cookieName: 'csrf-token',
    cookieOptions: {
      httpOnly: true,
      sameSite: 'strict',
      secure: isHttps,
      path: '/',
      maxAge: 1800000,
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
  })
}
