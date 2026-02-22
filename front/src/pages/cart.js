import { createTrustedHTML } from '../utils/trustedTypes.js'

export default function render(container) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  container.innerHTML = createTrustedHTML(`
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Mon Panier</h1>
      </div>

      <div id="cart-container">
        ${
          cart.length === 0
            ? `
        <div class="bg-gray-50 rounded-lg p-8 text-center">
          <span class="text-6xl mb-4 block">🛒</span>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Votre panier est vide</h3>
          <p class="text-gray-600 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
          <a href="#/products" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition inline-block">
            Voir les produits
          </a>
        </div>
          `
            : `
        <div id="cart-items" class="space-y-4 mb-6">
          <!-- Cart items -->
        </div>

        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-semibold">Total:</span>
            <span id="cart-total" class="text-2xl font-bold text-green-600">0.00 €</span>
          </div>

          <div class="flex justify-center">
            <button id="clear-cart" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
              Vider le panier
            </button>
          </div>
        </div>
          `
        }
      </div>

      <div class="mt-8">
        <a href="#/products" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition inline-block">
          ← Continuer mes achats
        </a>
      </div>
    </div>
  `)

  if (cart.length > 0) {
    renderCartItems(cart)
    updateTotal()
    setupEventListeners()
  }
}

function renderCartItems(cart) {
  const container = document.querySelector('#cart-items')

  const itemsHTML = cart
    .map(
      (item, index) => `
    <div class="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">`
            : `<div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center"><span class="text-3xl">📦</span></div>`
        }
        <div>
          <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
          <p class="text-gray-600">${item.category}</p>
          <p class="text-sm text-gray-500">${item.description}</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <button class="quantity-btn minus bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded" data-index="${index}">
            -
          </button>
          <span class="quantity px-3 py-1 border rounded" data-index="${index}">${item.quantity}</span>
          <button class="quantity-btn plus bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded" data-index="${index}">
            +
          </button>
        </div>

        <div class="text-right">
          <p class="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)} €</p>
          <p class="text-sm text-gray-500">${item.price.toFixed(2)} € / unité</p>
        </div>

        <button class="remove-item bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition" data-index="${index}">
          🗑️
        </button>
      </div>
    </div>
  `
    )
    .join('')

  container.innerHTML = createTrustedHTML(itemsHTML)
}

function updateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalElement = document.querySelector('#cart-total')

  if (totalElement) {
    totalElement.textContent = `${total.toFixed(2)} €`
  }
}

function setupEventListeners() {
  // Quantity buttons
  document.querySelectorAll('.quantity-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = Number.parseInt(e.target.dataset.index)
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      if (e.target.classList.contains('plus')) {
        cart[index].quantity += 1
      } else if (e.target.classList.contains('minus')) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1
        } else {
          // If quantity would be 0, remove the item entirely
          cart.splice(index, 1)
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart))

      // Re-render entire cart if an item was removed, or just update if quantity changed
      if (cart.length === 0) {
        const container = document.querySelector('.container')
        render(container)
      } else {
        renderCartItems(cart)
        updateTotal()
        // Re-attach event listeners after re-render
        setupEventListeners()
      }
    })
  })

  // Remove item buttons
  document.querySelectorAll('.remove-item').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = Number.parseInt(e.target.dataset.index)
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart))

      const container = document.querySelector('.container')
      render(container)
    })
  })

  const clearBtn = document.querySelector('#clear-cart')
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        localStorage.removeItem('cart')
        const container = document.querySelector('.container')
        render(container)
      }
    })
  }
}

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  const existingIndex = cart.findIndex((item) => item.id === product.id)

  if (existingIndex === -1) {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image || null,
      quantity: 1,
    })
  } else {
    cart[existingIndex].quantity += 1
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  const message = document.createElement('div')
  message.className =
    'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  message.textContent = `✅ "${product.name}" ajouté au panier`
  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 3000)
}
