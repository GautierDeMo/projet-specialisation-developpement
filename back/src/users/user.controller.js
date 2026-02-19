import { compare, create, findByEmail, hash } from './user.service.js'

export async function register(req, res, next) {
  //Générer l'access_token (refresh optionnel pour l'instant)
  const existingUser = await findByEmail(req.body.email)

  if (existingUser) {
    return next({ status: 409, message: 'User already exists' })
  }

  const hashedPassword = await hash(req.body.password)
  const newUser = await create(req.body.email, hashedPassword)

  res.json(newUser)
}
