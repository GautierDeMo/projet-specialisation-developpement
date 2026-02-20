import { authStore } from '../store/auth.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Single refresh promise to avoid concurrent refresh attempts
let refreshPromise = null

async function tryRefresh() {
  if (refreshPromise) return refreshPromise

  refreshPromise = fetch(`${API_URL}/user/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(async (res) => {
      if (!res.ok) {
        authStore.clear()
        return false
      }
      const data = await res.json()
      authStore.setToken(data.accessToken)
      return true
    })
    .catch(() => {
      authStore.clear()
      return false
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

/**
 * Fetch wrapper that automatically:
 * - Adds Authorization header with the current access token
 * - On 401: attempts token refresh then retries the request once
 * - On refresh failure: clears auth state and redirects to /login
 */
export async function apiFetch(path, options = {}) {
  const token = authStore.getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  let response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (response.status === 401) {
    const refreshed = await tryRefresh()

    if (refreshed) {
      const newToken = authStore.getToken()
      response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
        credentials: 'include',
      })
    } else {
      location.hash = '#/login'
    }
  }

  return response
}
