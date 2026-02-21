import z from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one digit')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const RegisterDTO = z.object({
  email: z.email(),
  password: passwordSchema,
})

export const LoginDTO = z.object({
  email: z.email(),
  password: z.string(),
})
