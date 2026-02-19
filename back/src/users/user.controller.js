import jwt from 'jsonwebtoken'
import {
  compare,
  create,
  deleteRefreshToken,
  findByEmail,
  findRefreshToken,
  generatePayload,
  generateToken,
  hash,
  saveRefreshToken,
} from './user.service.js'

const REFRESH_TOKEN_IN_DAYS = 7

const COOKIE_OPTIONS = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: REFRESH_TOKEN_IN_DAYS * 24 * 60 * 60 * 1000,
})

async function issueTokens(user, res) {
  const payload = generatePayload(user)
  const accessToken = generateToken(
    payload,
    process.env.ACCESS_SECRET_KEY,
    '15m'
  )
  const refreshToken = generateToken(
    payload,
    process.env.REFRESH_SECRET_KEY,
    '7d'
  )

  const expiredAt = new Date()
  expiredAt.setDate(expiredAt.getDate() + REFRESH_TOKEN_IN_DAYS)
  await saveRefreshToken(user.id, refreshToken, expiredAt)

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS())

  return accessToken
}

export async function register(req, res, next) {
  try {
    const existingUser = await findByEmail(req.body.email)

    if (existingUser) {
      return next({ status: 409, message: 'User already exists' })
    }

    const hashedPassword = await hash(req.body.password)
    const newUser = await create(req.body.email, hashedPassword)
    const accessToken = await issueTokens(newUser, res)

    return res.status(201).json({
      user: newUser,
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const user = await findByEmail(req.body.email)

    if (!user) return next({ status: 401, message: 'Invalid credentials' })

    const isPasswordCorrect = await compare(req.body.password, user.password)

    if (!isPasswordCorrect)
      return next({ status: 401, message: 'Invalid credentials' })

    const accessToken = await issueTokens(user, res)
    const { id, email } = user

    return res.status(200).json({
      user: { id, email },
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export async function refreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken

  try {
    if (!refreshToken) {
      return next({ status: 401, message: 'Refresh token required' })
    }

    const stored = await findRefreshToken(refreshToken)

    if (!stored) {
      return next({ status: 403, message: 'Invalid refresh token' })
    }

    if (stored.expiredAt < new Date()) {
      await deleteRefreshToken(refreshToken)
      return next({ status: 403, message: 'Invalid refresh token' })
    }

    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

    // Token rotation: delete old token, issue a new one
    await deleteRefreshToken(refreshToken)
    const newRefreshToken = generateToken(
      { sub: payload.sub, email: payload.email },
      process.env.REFRESH_SECRET_KEY,
      '7d'
    )
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + REFRESH_TOKEN_IN_DAYS)
    await saveRefreshToken(stored.userId, newRefreshToken, expiredAt)

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS())

    const newAccessToken = generateToken(
      { sub: payload.sub, email: payload.email },
      process.env.ACCESS_SECRET_KEY,
      '15m'
    )

    return res.status(200).json({ accessToken: newAccessToken })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Clean up the expired token from DB
      await deleteRefreshToken(refreshToken).catch(() => {})
      return next({ status: 403, message: 'Invalid refresh token' })
    }
    if (error.name === 'JsonWebTokenError') {
      return next({ status: 403, message: 'Invalid refresh token' })
    }
    next(error)
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return next({ status: 400, message: 'Refresh token required' })
    }

    await deleteRefreshToken(refreshToken)

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}
