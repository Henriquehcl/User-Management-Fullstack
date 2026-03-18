import { defineStore } from 'pinia'
import { api } from '@/services/api/http'

type User = {
  id: string
  name: string
  email: string
}

type AuthState = {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  }),
  getters: {
    isAuthenticated: (s) => Boolean(s.token),
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    async register(name: string, email: string, password: string) {
      const { data } = await api.post('/auth/register', { name, email, password })
      return data.user as User
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

