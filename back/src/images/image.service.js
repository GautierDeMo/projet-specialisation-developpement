import { prisma } from '../orm/client.js'

export async function saveImage({ productId, imageBase64 }) {
  const buffer = Buffer.from(imageBase64, 'base64')

  return prisma.image.create({
    data: {
      productId,
      data: buffer,
    },
    select: {
      productId: true,
      url: true,
    },
  })
}
