export const fetchStats = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/stats')
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error)
    return []
  }
}
