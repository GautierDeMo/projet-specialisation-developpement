function getBackendUrl() {
  const backendHost = import.meta.env.VITE_API_URL || 'localhost:3000'

  const protocol = globalThis.location.protocol

  return `${protocol}//${backendHost}/api`
}

export const API_URL = getBackendUrl()
