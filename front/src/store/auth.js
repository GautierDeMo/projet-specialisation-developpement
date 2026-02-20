let _token = null
let _user = null

export const authStore = {
  getToken: () => _token,
  setToken: (token) => {
    _token = token
  },
  getUser: () => _user,
  setUser: (user) => {
    _user = user
  },
  clear: () => {
    _token = null
    _user = null
  },
  isAuthenticated: () => !!_token,
}
