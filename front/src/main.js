import { navigate } from './router.js'

try {
  await navigate()
} catch (error) {
  console.error("Erreur lors de l'initialisation :", error)
}
