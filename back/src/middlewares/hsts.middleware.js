export const hstsMiddleware = (req, res, next) => {
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https'

  if (isHttps) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  next()
}
