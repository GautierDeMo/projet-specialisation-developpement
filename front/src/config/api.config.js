function getBackendUrl() {
  const backendHost = import.meta.env.VITE_API_URL || 'localhost:3000'

  const protocol = window.location.protocol

  const url = `${protocol}//${backendHost}`

  if (import.meta.env.DEV) {
  }

  return url
}

export const API_URL = getBackendUrl()
