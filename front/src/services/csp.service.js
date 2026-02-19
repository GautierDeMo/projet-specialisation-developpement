const API_URL = import.meta.env.VITE_API_URL

export const cspService = {
  async getReports() {
    try {
      const response = await fetch(`${API_URL}/api/csp/reports`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching CSP reports:', error)
      throw error
    }
  },

  async deleteAllReports() {
    try {
      const response = await fetch(`${API_URL}/api/csp/reports`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return true
    } catch (error) {
      console.error('Error deleting CSP reports:', error)
      throw error
    }
  },
}
