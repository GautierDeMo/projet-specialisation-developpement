import z from 'zod'

export const ProductDTO = z.object({
  category: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  price: z.number()
})
