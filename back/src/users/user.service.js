import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { prisma } from '../orm/client.js'

/**
 * Hash a token using SHA-256
 *
 * @param {string} token
 *
 * @returns {string} The hex-encoded SHA-256 hash
 */
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Use bcrypt to hash a string
 *
 * @param {string} text - The string to hash (password, token, etc...)
 *
 * @returns {Promise<string>} The hashed string
 */
export async function hash(text) {
  return await bcrypt.hash(text, 10)
}

/**
 * Use bcrypt to compare a string to a hashed string
 *
 * @param {string} text
 * @param {string} hashedText
 *
 * @returns {Promise<boolean>} True if both parameters match
 */
export async function compare(text, hashedText) {
  return await bcrypt.compare(text, hashedText)
}

/**
 * Use prisma to add a new user in database
 *
 * @param {string} email
 * @param {string} password - hashed password
 * @returns {Promise<Omit<User, 'password'>>}
 */
export async function create(email, password) {
  return await prisma.user.create({
    data: { email, password },
    omit: { password: true },
  })
}

/**
 * Use prisma to find a user by his email
 *
 * @param {string} email
 *
 * @returns {Promise<User | null>}
 */
export async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

export function generatePayload(user) {
  return {
    sub: user.id,
    email: user.email,
  }
}

/**
 * @typedef {Object} Payload payload with user id (sub) and email
 * @property {number} sub
 * @property {string} email
 */

/**
 *
 * @param {Payload} payload
 * @param {string} secret
 * @param {string} expiration ex: '5min'
 *
 * @returns { Promise<string> } the json web token
 */
export function generateToken(payload, secret, expiration) {
  return jwt.sign(payload, secret, { expiresIn: expiration })
}

/**
 * Save a refresh token in database linked to a user
 *
 * @param {number} userId
 * @param {string} token - The refresh token string
 * @param {Date} expiredAt - Expiration date of the token
 *
 * @returns {Promise<Token>}
 */
export async function saveRefreshToken(userId, token, expiredAt) {
  return await prisma.token.create({
    data: { userId, token: hashToken(token), expiredAt },
  })
}

/**
 * Find a refresh token in database
 *
 * @param {string} token
 *
 * @returns {Promise<Token | null>}
 */
export async function findRefreshToken(token) {
  return await prisma.token.findFirst({
    where: { token: hashToken(token) },
  })
}

/**
 * Delete a refresh token from database (used on logout or rotation)
 *
 * @param {string} token
 *
 * @returns {Promise<{ count: number }>}
 */
export async function deleteRefreshToken(token) {
  return await prisma.token.deleteMany({
    where: { token: hashToken(token) },
  })
}
