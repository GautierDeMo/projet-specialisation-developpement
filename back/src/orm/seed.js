import { urlToBase64 } from '../utils/urlToBase64.js'
import { prisma } from './client.js'

const products = [
  // ===== Alimentation (12 produits) =====
  {
    name: 'Pâtes',
    description: 'Pâtes italiennes',
    price: 2.5,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Riz',
    description: 'Riz basmati',
    price: 3.2,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Pain',
    description: 'Pain complet',
    price: 1.8,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Lait',
    description: 'Lait demi-écrémé',
    price: 1.2,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Fromage',
    description: 'Fromage cheddar',
    price: 4.5,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Poulet',
    description: 'Blanc de poulet',
    price: 7.9,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Pommes',
    description: 'Pommes bio',
    price: 2.9,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Yaourt',
    description: 'Yaourt nature',
    price: 2.1,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Beurre',
    description: 'Beurre doux',
    price: 2.7,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Sucre',
    description: 'Sucre blanc',
    price: 1.5,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Farine',
    description: 'Farine T45',
    price: 1.3,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Café',
    description: 'Café moulu',
    price: 5.4,
    category: 'Alimentation',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Ameublement (8 produits) =====
  {
    name: 'Chaise',
    description: 'Chaise en bois',
    price: 49.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Table',
    description: 'Table à manger',
    price: 199.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Canapé',
    description: 'Canapé 3 places',
    price: 599.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Lit',
    description: 'Lit double',
    price: 399.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Armoire',
    description: 'Armoire 2 portes',
    price: 299.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Bureau',
    description: 'Bureau moderne',
    price: 159.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Étagère',
    description: 'Étagère murale',
    price: 39.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Commode',
    description: 'Commode bois massif',
    price: 249.9,
    category: 'Ameublement',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Sport (10 produits) =====
  {
    name: 'Ballon',
    description: 'Ballon de foot',
    price: 19.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Raquette',
    description: 'Raquette tennis',
    price: 89.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Haltères',
    description: 'Paire haltères',
    price: 29.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Tapis yoga',
    description: 'Tapis antidérapant',
    price: 24.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Vélo',
    description: 'Vélo VTT',
    price: 499.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Casque',
    description: 'Casque vélo',
    price: 39.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Maillot',
    description: 'Maillot sport',
    price: 29.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Short',
    description: 'Short running',
    price: 19.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Chaussures',
    description: 'Chaussures running',
    price: 89.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Gants',
    description: 'Gants fitness',
    price: 14.9,
    category: 'Sport',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Ménage (6 produits) =====
  {
    name: 'Balai',
    description: 'Balai classique',
    price: 9.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Serpillière',
    description: 'Serpillière microfibre',
    price: 6.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Aspirateur',
    description: 'Aspirateur puissant',
    price: 149.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Produit sol',
    description: 'Nettoyant sol',
    price: 4.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Éponge',
    description: 'Éponge vaisselle',
    price: 1.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Seau',
    description: 'Seau plastique',
    price: 5.9,
    category: 'Ménage',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Hygiène (7 produits) =====
  {
    name: 'Shampooing',
    description: 'Shampooing doux',
    price: 3.9,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Savon',
    description: 'Savon solide',
    price: 1.5,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Dentifrice',
    description: 'Dentifrice menthe',
    price: 2.9,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Brosse dents',
    description: 'Brosse à dents',
    price: 1.9,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Gel douche',
    description: 'Gel douche parfumé',
    price: 3.5,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Déodorant',
    description: 'Déodorant spray',
    price: 2.9,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Mouchoirs',
    description: 'Boîte mouchoirs',
    price: 2.2,
    category: 'Hygiène',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Électronique (8 produits) =====
  {
    name: 'Smartphone',
    description: 'Smartphone dernière génération',
    price: 699.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Ordinateur portable',
    description: 'PC portable 15 pouces',
    price: 999.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Tablette',
    description: 'Tablette 10 pouces',
    price: 299.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Écouteurs',
    description: 'Écouteurs sans fil',
    price: 149.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Montre connectée',
    description: 'Smartwatch sport',
    price: 199.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Appareil photo',
    description: 'Appareil photo numérique',
    price: 449.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Téléviseur',
    description: 'TV 4K 55 pouces',
    price: 799.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Console de jeu',
    description: 'Console de jeux vidéo',
    price: 399.9,
    category: 'Électronique',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Jardin (6 produits) =====
  {
    name: 'Tondeuse',
    description: 'Tondeuse à gazon électrique',
    price: 249.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Arrosoir',
    description: 'Arrosoir 10 litres',
    price: 19.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Bêche',
    description: 'Bêche jardin métallique',
    price: 29.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Gants de jardinage',
    description: 'Gants résistants',
    price: 12.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Serre',
    description: 'Petite serre de jardin',
    price: 149.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Transplantoir',
    description: 'Transplantoir professionnel',
    price: 24.9,
    category: 'Jardin',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80") }]
    },
  },

  // ===== Vêtements (8 produits) =====
  {
    name: 'T-shirt',
    description: 'T-shirt coton bio',
    price: 19.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") }]
    },
  },
  {
    name: 'Jean',
    description: 'Jean denim slim',
    price: 59.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amVhbnxlbnwwfHwwfHx8Mg%3D%3D", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amVhbnxlbnwwfHwwfHx8Mg%3D%3D") }]
    },
  },
  {
    name: 'Robe',
    description: "Robe d'été",
    price: 39.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Veste',
    description: 'Veste imperméable',
    price: 79.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Baskets',
    description: 'Baskets sport',
    price: 69.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Pull',
    description: 'Pull laine',
    price: 49.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") }]
    },
  },
  {
    name: 'Écharpe',
    description: 'Écharpe en laine',
    price: 24.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80") }]
    },
  },
  {
    name: 'Chaussettes',
    description: 'Lot de 3 paires',
    price: 12.9,
    category: 'Vêtements',
    images: {
      create: [{ url: "https://images.unsplash.com/photo-1640025867572-f6b3a8410c81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdXNzZXR0ZXN8ZW58MHx8MHx8fDI%3D", urlBase64: await urlToBase64("https://images.unsplash.com/photo-1640025867572-f6b3a8410c81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdXNzZXR0ZXN8ZW58MHx8MHx8fDI%3D") }]
    },
  },
]

async function main() {
  // Supprime les produits existants
  await prisma.product.deleteMany()
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  console.log('Seed terminé')
}

try {
  await main()
} catch (error) {
  console.error(error)
} finally {
  await prisma.$disconnect()
}
