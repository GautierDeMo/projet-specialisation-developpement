import { prisma } from "../orm/client.js"

/**
 * Récupère les statistiques des catégories
 * @returns {Promise<Array<{ nom: string, compte: number }>>}
 */
export const getCategoryStats = async () =>
  prisma.product
    .groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    })
    .then((results) =>
      results.map(({ category, _count }) => ({
        nom: category,
        compte: _count.category,
      }))
    )
