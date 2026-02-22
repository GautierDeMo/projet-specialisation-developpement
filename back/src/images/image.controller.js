import { saveImage } from './image.service.js'

/** @type {import("express").RequestHandler} */
export async function postImageAfterProductCreation(req, res, next) {
  try {
    if (
      !req.params.productId ||
      Number.isNaN(Number.parseInt(req.params.productId))
    ) {
      return res.status(400).json({ msg: 'Valid Product ID is required' })
    }

    if (req.body.imageUrl && req.params.productId) {
      const newImage = await saveImage({ productId: req.params.productId, url: req.body.imageUrl })

      return res.status(201).json({ msg: `New image added`, image: newImage })
    }
    return res.status(400).json({ msg: 'No image data provided' })
  } catch (error) {
    if (error.message === "DTO error") {
      return res.status(404).json({ msg: "Image not created because of validations" })
    }
    next(error)
  }
}
