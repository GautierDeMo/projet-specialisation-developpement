import z from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Min 8 caractères')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial'
  )

export const RegisterDTO = z.object({
  email: z.email(),
  password: passwordSchema,
})
