import { urlToBase64 } from '../utils/urlToBase64.js'
import { saveImage } from './image.service.js'

/** @type {import("express").RequestHandler} */
export async function postImageAfterProductCreation(req, res, next) {
  try {
    const { imageBase64, imageUrl } = req.body

    if (
      !req.params.productId ||
      Number.isNaN(Number.parseInt(req.params.productId))
    ) {
      return res.status(400).json({ msg: 'Valid Product ID is required' })
    }

    let base64Data = imageBase64

    // If imageUrl is provided, convert it to base64
    if (imageUrl && !base64Data) {
      try {
        base64Data = await urlToBase64(imageUrl)
      } catch (conversionError) {
        console.error('Error converting URL to base64:', conversionError)
        return res.status(400).json({
          msg: 'Failed to convert image URL to base64',
          error: conversionError.message,
        })
      }
    }

    if (base64Data) {
      try {
        const newImage = await saveImage({
          productId: Number.parseInt(req.params.productId),
          imageBase64: base64Data,
        })
        return res.status(201).json({ msg: `New image added`, image: newImage })
      } catch (saveError) {
        console.error('Error saving image:', saveError)
        return res.status(500).json({
          msg: 'Failed to save image to database',
          error: saveError.message,
        })
      }
    }

    return res.status(400).json({ msg: 'No image data provided' })
  } catch (error) {
    console.error('Unexpected error in image controller:', error)
    next(error)
  }
}
