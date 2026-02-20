import { login } from '../api/auth.js'

export default function render(container) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Connexion</h1>

        <form id="login-form" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              autocomplete="email"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              autocomplete="current-password"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <p id="error-msg" class="text-red-600 text-sm hidden"></p>

          <button
            type="submit"
            id="submit-btn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Pas encore de compte ?
          <a href="#/register" class="text-blue-600 hover:underline font-medium">S'inscrire</a>
        </p>
      </div>
    </div>
  `

  const form = container.querySelector('#login-form')
  const errorMsg = container.querySelector('#error-msg')
  const submitBtn = container.querySelector('#submit-btn')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorMsg.classList.add('hidden')
    submitBtn.disabled = true
    submitBtn.textContent = 'Connexion...'

    const email = container.querySelector('#email').value.trim()
    const password = container.querySelector('#password').value

    try {
      await login(email, password)
      location.hash = '#/'
    } catch (err) {
      errorMsg.textContent = err.message
      errorMsg.classList.remove('hidden')
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Se connecter'
    }
  })
}
