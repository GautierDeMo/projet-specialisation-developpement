import {
  compare,
  create,
  findByEmail,
  generatePayload,
  generateToken,
  hash,
} from './user.service.js'

export async function register(req, res, next) {
  try {
    const existingUser = await findByEmail(req.body.email)

    if (existingUser) {
      return next({ status: 409, message: 'User already exists' })
    }

    const hashedPassword = await hash(req.body.password)
    const newUser = await create(req.body.email, hashedPassword)
    const payload = generatePayload(newUser)
    const token = generateToken(payload, process.env.ACCESS_SECRET_KEY, '1h')

    return res.status(201).json({
      user: newUser,
      accessToken: token,
    })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const user = await findByEmail(req.body.email)

    if (!user) return next({ status: 401, message: 'Invalid credentials' })

    const isPasswordCorrect = await compare(req.body.password, user.password)

    if (!isPasswordCorrect)
      return next({ status: 401, message: 'Invalid credentials' })

    const payload = generatePayload(user)
    const token = generateToken(payload, process.env.ACCESS_SECRET_KEY, '1h')
    const { id, email } = user

    return res.status(200).json({
      user: {
        id,
        email,
      },
      accessToken: token,
    })
  } catch (error) {
    next(error)
  }
}
