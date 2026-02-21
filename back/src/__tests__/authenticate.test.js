import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import jwt from 'jsonwebtoken'
import { authenticate } from '../middlewares/authenticate.js'

process.env.ACCESS_SECRET_KEY = 'test-access-secret'

function mockReq(authHeader) {
  return { headers: authHeader ? { authorization: authHeader } : {} }
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('authenticate', () => {
  it('calls next with 401 when no Authorization header is present', () => {
    const next = jest.fn()
    authenticate(mockReq(null), {}, next)
    expect(next).toHaveBeenCalledWith({
      status: 401,
      message: 'Access token required',
    })
  })

  it('calls next with 401 when the header does not start with "Bearer "', () => {
    const next = jest.fn()
    authenticate(mockReq('Basic sometoken'), {}, next)
    expect(next).toHaveBeenCalledWith({
      status: 401,
      message: 'Access token required',
    })
  })

  it('attaches user to req and calls next() with no args for a valid token', () => {
    const token = jwt.sign(
      { sub: 1, email: 'user@example.com' },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: '15m' }
    )
    const req = mockReq(`Bearer ${token}`)
    const next = jest.fn()

    authenticate(req, {}, next)

    expect(next).toHaveBeenCalledWith()
    expect(req.user).toEqual({ id: 1, email: 'user@example.com' })
  })

  it('calls next with 401 "Access token expired" for an expired token', () => {
    const token = jwt.sign(
      { sub: 1, email: 'user@example.com' },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: '-1s' }
    )
    const next = jest.fn()

    authenticate(mockReq(`Bearer ${token}`), {}, next)

    expect(next).toHaveBeenCalledWith({
      status: 401,
      message: 'Access token expired',
    })
  })

  it('calls next with 401 "Invalid access token" for a token with a wrong signature', () => {
    const token = jwt.sign(
      { sub: 1, email: 'user@example.com' },
      'wrong-secret',
      { expiresIn: '15m' }
    )
    const next = jest.fn()

    authenticate(mockReq(`Bearer ${token}`), {}, next)

    expect(next).toHaveBeenCalledWith({
      status: 401,
      message: 'Invalid access token',
    })
  })
})
