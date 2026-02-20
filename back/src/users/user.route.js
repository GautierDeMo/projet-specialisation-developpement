import { Router } from 'express'
import { register, login, refreshToken, logout } from './user.controller.js'
import { validate } from '../middlewares/validate.js'
import { LoginDTO, RegisterDTO } from './auth.dto.js'

const router = Router()

router.post('/register', validate(RegisterDTO), register)
router.post('/login', validate(LoginDTO), login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)

export { router as userRouter }
