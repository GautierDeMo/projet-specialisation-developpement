import { navigate } from './router.js'

try {
  await navigate()
} catch (error) {
  console.error(error)
}
