import { compare, create, hash } from './user.service.js'

export async function register(req, res, next) {
  //Vérifier si le user existe déjà
  //Hasher le mdp
  //Créer le user
  //Générer l'access_token (refresh optionnel pour l'instant)
  const hashedPassword = await hash(req.body.password)
  const newUser = await create(req.body.email, hashedPassword)

  res.json(newUser)
}
