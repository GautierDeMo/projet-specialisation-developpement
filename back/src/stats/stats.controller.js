import { getCategoryStats } from './stats.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getStats = async (req, res, next) => {
  try {
    const stats = await getCategoryStats()
    res.json(stats)
  } catch (error) {
    next(error)
  }
}
