import z from 'zod'

export const ProductDTO = z.object({
  category: z.string(),
  description: z.string(),
  image: z.object({ url: z.string() }).optional(),
  name: z.string(),
  price: z.number()
})
