import { apiFetch } from '../utils/client.js'
import { authStore } from '../store/auth.js'
import { API_URL } from '../config/api.config.js'
import { resetCsrfToken, getCsrfToken } from '../utils/csrf.js'

export async function register(email, password, csrfToken) {
  const response = await apiFetch('/user/register', {
    method: 'POST',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription")
  }

  authStore.setToken(data.accessToken)
  authStore.setUser(data.user)
  return data
}

export async function login(email, password, csrfToken) {
  const response = await apiFetch('/user/login', {
    method: 'POST',
    headers: {
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Identifiants invalides')
  }

  authStore.setToken(data.accessToken)
  authStore.setUser(data.user)
  return data
}

export async function logout() {
  try {
    await apiFetch('/user/logout', { method: 'POST' })
    location.hash = '#/login'
  } finally {
    authStore.clear()
    resetCsrfToken()
  }
}

/**
 * Attempts to restore a session from the refresh token cookie.
 * Returns true if a valid session was restored.
 */
export async function checkAuth() {
  try {
    // Get CSRF token for the refresh request
    const csrfToken = await getCsrfToken()
    
    const response = await fetch(`${API_URL}/user/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
    })

    if (!response.ok) return false

    const data = await response.json()
    authStore.setToken(data.accessToken)
    authStore.setUser(data.user)
    return true
  } catch {
    return false
  }
}
