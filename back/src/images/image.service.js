import { urlToBase64 } from "../utils/utils.js"

export async function saveImage({ productId, url }) {
  const urlBase64 = await urlToBase64(url)

  return await prisma.image.create({
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
