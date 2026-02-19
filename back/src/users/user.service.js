import * as bcrypt from 'bcrypt'
import { prisma } from '../db/client.js'
import jwt from 'jsonwebtoken'

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
 * Use bcrypt to compare a string and a hashed string
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
 * @returns {Promise<User>}
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
 * @param {string} expiration ex: '1h', '5min'
 *
 * @returns { Promise<string> } the json web token
 */
export function generateToken(payload, secret, expiration) {
  return jwt.sign(payload, secret, { expiresIn: expiration })
}
