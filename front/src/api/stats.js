import { API_URL } from '../config/api.config.js'

export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats`)
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return []
  }
}
