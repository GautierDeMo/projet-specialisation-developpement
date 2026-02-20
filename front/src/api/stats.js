export const fetchStats = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://localhost:3000'

    const response = await fetch(`${apiUrl}/api/stats`)

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error)
    return []
  }
}
