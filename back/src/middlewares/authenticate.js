import jwt from 'jsonwebtoken'

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next({ status: 401, message: 'Access token required' })
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next({ status: 401, message: 'Access token expired' })
    }
    return next({ status: 401, message: 'Invalid access token' })
  }
}
