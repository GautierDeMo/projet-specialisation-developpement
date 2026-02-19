import * as bcrypt from 'bcrypt'
import { prisma } from '../db/client.js'

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
 * @returns {Promise<User>}
 */
export async function create(email, password) {
  return await prisma.user.create({
    data: { email, password },
  })
}
