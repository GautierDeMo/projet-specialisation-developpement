import { prisma } from '../orm/client.js'
import { urlToBase64 } from "../utils/utils.js"
import { ImageDTO } from "./image.dto.js"

export async function saveImage({ productId, url }) {
  const urlBase64 = await urlToBase64(url)
  console.log("Begin saving image", productId, url, urlBase64)
  const result = ImageDTO.safeParse({
    productId,
    url,
    urlBase64
  })
  if (!result.success) {
    throw new Error("DTO error");
  }
  return prisma.image.create({
    data: {
      productId,
      url,
      urlBase64
    },
    select: {
      productId: true,
      url: true
    }
  })
}
