export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500
  const message =
    status < 500 ? (err.message ?? 'Error') : 'Internal server error'
  res.status(status).json({ message })
}
