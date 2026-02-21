import z from 'zod'

export const ProductDTO = z.object({
  category: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  name: z.string().optional(),
  price: z.number().optional(),
})
