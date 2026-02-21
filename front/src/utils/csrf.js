import { API_URL } from '../config/api.config.js'

let csrfToken = null

export async function getCsrfToken() {
  if (csrfToken) return csrfToken

  try {
    const response = await fetch(`${API_URL}/user/csrf-token`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to get CSRF token')
    }

    const data = await response.json()
    csrfToken = data.csrfToken
    return csrfToken
  } catch (error) {
    console.error('Error getting CSRF token:', error)
    throw error
  }
}

export function resetCsrfToken() {
  csrfToken = null
}
