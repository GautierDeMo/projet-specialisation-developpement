export const fetchStats = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error)
    return []
  }
}
