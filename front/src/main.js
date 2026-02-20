import { checkAuth } from './api/auth.js'
import { navigate } from './router.js'
import { renderNavbar } from './components/navbar.js'

// Attempt to restore an existing session from the refresh token cookie
await checkAuth()

renderNavbar()

try {
  await navigate()
} catch (error) {
  console.error(error)
}
