export async function urlToBase64(url) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  return buffer.toString('base64')
}
