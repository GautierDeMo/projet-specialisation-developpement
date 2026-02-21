export async function getCsrfToken(req, res) {
  try {
    if (!globalThis.csrfGenerateToken) {
      throw new Error('CSRF not initialized')
    }

    const token = globalThis.csrfGenerateToken(req, res)
    res.json({ csrfToken: token })
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    res.status(500).json({ error: 'Failed to generate CSRF token' })
  }
}
