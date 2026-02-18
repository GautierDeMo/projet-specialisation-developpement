import * as bcrypt from 'bcrypt'

/**
 * Use bcrypt to hash a string
 *
 * @param {string} text - The string to hash (password, token, etc...)
 *
 * @returns {string} The hashed string
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
 * @returns {boolean} True if both parameters match
 */
export async function compare(text, hashedText) {
  return await bcrypt.compare(text, hashedText)
}
