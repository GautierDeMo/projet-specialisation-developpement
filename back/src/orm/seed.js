import { prisma } from './client.js'

const products = [
  // ===== Alimentation (12 produits) =====
  {
    name: 'Pâtes',
    description: 'Pâtes italiennes',
    price: 2.5,
    category: 'Alimentation',
  },
  {
    name: 'Riz',
    description: 'Riz basmati',
    price: 3.2,
    category: 'Alimentation',
  },
  {
    name: 'Pain',
    description: 'Pain complet',
    price: 1.8,
    category: 'Alimentation',
  },
  {
    name: 'Lait',
    description: 'Lait demi-écrémé',
    price: 1.2,
    category: 'Alimentation',
  },
  {
    name: 'Fromage',
    description: 'Fromage cheddar',
    price: 4.5,
    category: 'Alimentation',
  },
  {
    name: 'Poulet',
    description: 'Blanc de poulet',
    price: 7.9,
    category: 'Alimentation',
  },
  {
    name: 'Pommes',
    description: 'Pommes bio',
    price: 2.9,
    category: 'Alimentation',
  },
  {
    name: 'Yaourt',
    description: 'Yaourt nature',
    price: 2.1,
    category: 'Alimentation',
  },
  {
    name: 'Beurre',
    description: 'Beurre doux',
    price: 2.7,
    category: 'Alimentation',
  },
  {
    name: 'Sucre',
    description: 'Sucre blanc',
    price: 1.5,
    category: 'Alimentation',
  },
  {
    name: 'Farine',
    description: 'Farine T45',
    price: 1.3,
    category: 'Alimentation',
  },
  {
    name: 'Café',
    description: 'Café moulu',
    price: 5.4,
    category: 'Alimentation',
  },

  // ===== Ameublement (8 produits) =====
  {
    name: 'Chaise',
    description: 'Chaise en bois',
    price: 49.9,
    category: 'Ameublement',
  },
  {
    name: 'Table',
    description: 'Table à manger',
    price: 199.9,
    category: 'Ameublement',
  },
  {
    name: 'Canapé',
    description: 'Canapé 3 places',
    price: 599.9,
    category: 'Ameublement',
  },
  {
    name: 'Lit',
    description: 'Lit double',
    price: 399.9,
    category: 'Ameublement',
  },
  {
    name: 'Armoire',
    description: 'Armoire 2 portes',
    price: 299.9,
    category: 'Ameublement',
  },
  {
    name: 'Bureau',
    description: 'Bureau moderne',
    price: 159.9,
    category: 'Ameublement',
  },
  {
    name: 'Étagère',
    description: 'Étagère murale',
    price: 39.9,
    category: 'Ameublement',
  },
  {
    name: 'Commode',
    description: 'Commode bois massif',
    price: 249.9,
    category: 'Ameublement',
  },

  // ===== Sport (10 produits) =====
  {
    name: 'Ballon',
    description: 'Ballon de foot',
    price: 19.9,
    category: 'Sport',
  },
  {
    name: 'Raquette',
    description: 'Raquette tennis',
    price: 89.9,
    category: 'Sport',
  },
  {
    name: 'Haltères',
    description: 'Paire haltères',
    price: 29.9,
    category: 'Sport',
  },
  {
    name: 'Tapis yoga',
    description: 'Tapis antidérapant',
    price: 24.9,
    category: 'Sport',
  },
  { name: 'Vélo', description: 'Vélo VTT', price: 499.9, category: 'Sport' },
  {
    name: 'Casque',
    description: 'Casque vélo',
    price: 39.9,
    category: 'Sport',
  },
  {
    name: 'Maillot',
    description: 'Maillot sport',
    price: 29.9,
    category: 'Sport',
  },
  {
    name: 'Short',
    description: 'Short running',
    price: 19.9,
    category: 'Sport',
  },
  {
    name: 'Chaussures',
    description: 'Chaussures running',
    price: 89.9,
    category: 'Sport',
  },
  {
    name: 'Gants',
    description: 'Gants fitness',
    price: 14.9,
    category: 'Sport',
  },

  // ===== Ménage (6 produits) =====
  {
    name: 'Balai',
    description: 'Balai classique',
    price: 9.9,
    category: 'Ménage',
  },
  {
    name: 'Serpillière',
    description: 'Serpillière microfibre',
    price: 6.9,
    category: 'Ménage',
  },
  {
    name: 'Aspirateur',
    description: 'Aspirateur puissant',
    price: 149.9,
    category: 'Ménage',
  },
  {
    name: 'Produit sol',
    description: 'Nettoyant sol',
    price: 4.9,
    category: 'Ménage',
  },
  {
    name: 'Éponge',
    description: 'Éponge vaisselle',
    price: 1.9,
    category: 'Ménage',
  },
  {
    name: 'Seau',
    description: 'Seau plastique',
    price: 5.9,
    category: 'Ménage',
  },

  // ===== Hygiène (7 produits) =====
  {
    name: 'Shampooing',
    description: 'Shampooing doux',
    price: 3.9,
    category: 'Hygiène',
  },
  {
    name: 'Savon',
    description: 'Savon solide',
    price: 1.5,
    category: 'Hygiène',
  },
  {
    name: 'Dentifrice',
    description: 'Dentifrice menthe',
    price: 2.9,
    category: 'Hygiène',
  },
  {
    name: 'Brosse dents',
    description: 'Brosse à dents',
    price: 1.9,
    category: 'Hygiène',
  },
  {
    name: 'Gel douche',
    description: 'Gel douche parfumé',
    price: 3.5,
    category: 'Hygiène',
  },
  {
    name: 'Déodorant',
    description: 'Déodorant spray',
    price: 2.9,
    category: 'Hygiène',
  },
  {
    name: 'Mouchoirs',
    description: 'Boîte mouchoirs',
    price: 2.2,
    category: 'Hygiène',
  },
]

async function main() {
  await prisma.product.createMany({
    data: products,
  })
  console.log('Seed terminé')
}

try {
  await main()
} catch (error) {
  console.error(error)
} finally {
  await prisma.$disconnect()
}
