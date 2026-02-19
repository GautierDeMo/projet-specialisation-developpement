import { Router } from 'express'
import { register, login } from './user.controller.js'
import { validate } from '../middlewares/validate.js'
import { LoginDTO, RegisterDTO } from './auth.dto.js'

const router = Router()

router.post('/register', validate(RegisterDTO), register)
router.post('/login', validate(LoginDTO), login)

export { router as UserRouter }
