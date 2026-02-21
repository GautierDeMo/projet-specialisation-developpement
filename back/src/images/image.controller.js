/** @type {import("express").RequestHandler} */
export async function postImageAfterProductCreation(req, res, next) {
  try {
    const imageBase64 = req.body.imageBase64

    if (imageBase64 && req.params.productId) {
      const newImage = await saveImage({ productId: req.params.productId, imageBase64 })
      return res.status(201).json({ msg: `New image added`, image: newImage })
    }
  } catch (error) {
    next(error)
  }
}
