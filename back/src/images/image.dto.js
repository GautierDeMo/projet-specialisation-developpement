import z from 'zod'

export const ImageDTO = z.object({
  productId: z.number(),
  url: z.string(),
  urlBase64: z.string()
})
