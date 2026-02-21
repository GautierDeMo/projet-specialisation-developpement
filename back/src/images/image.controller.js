/** @type {import("express").RequestHandler} */
export async function postImageAfterProductCreation(req, res, next) {
  try {
    console.log("begin image creation", req.body.imageUrl, req.params.productId)
    if (req.body.imageUrl && req.params.productId) {
      const newImage = await saveImage({ productId: req.params.productId, imageBase64 })
      return res.status(201).json({ msg: `New image added`, image: newImage })
    }
  } catch (error) {
    if (error.message === "DTO error") {
      return res.status(404).json({ msg: "Image not created because of validations" })
    }
    next(error)
  }
}
