import { Router } from 'express'
import { register } from './user.controller.js'
import { validate } from '../middlewares/validate.js'
import { RegisterDTO } from './auth.dto.js'

const router = Router()

router.post('/register', validate(RegisterDTO), register)

export { router as UserRouter }
