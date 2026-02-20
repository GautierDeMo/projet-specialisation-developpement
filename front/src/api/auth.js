import { apiFetch } from './client.js'
import { authStore } from '../store/auth.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function register(email, password) {
  const response = await apiFetch('/user/register', {
    method: 'POST',
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

export async function login(email, password) {
  const response = await apiFetch('/user/login', {
    method: 'POST',
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
  }
}

/**
 * Attempts to restore a session from the refresh token cookie.
 * Returns true if a valid session was restored.
 */
export async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/user/refresh`, {
      method: 'POST',
      credentials: 'include',
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
