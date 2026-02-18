import { hash } from './user.service.js'

export async function register(req, res, next) {
  //Hasher le mdp
  //Créer le user
  //Générer l'access_token (refresh optionnel pour l'instant)
  const hashedPassword = await hash(req.body.password)
  res.json(hashedPassword)
}
