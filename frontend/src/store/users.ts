import { defineStore } from 'pinia'
import { api } from '@/services/api/http'

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

type UsersState = {
  items: User[]
  loading: boolean
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { data } = await api.get('/users')
        this.items = data.users
      } finally {
        this.loading = false
      }
    },
    async getById(id: string) {
      const { data } = await api.get(`/users/${id}`)
      return data.user as User
    },
    async create(payload: { name: string; email: string; password: string }) {
      const { data } = await api.post('/users', payload)
      await this.fetchAll()
      return data.user as User
    },
    async update(id: string, payload: { name?: string; email?: string; password?: string }) {
      const { data } = await api.put(`/users/${id}`, payload)
      await this.fetchAll()
      return data.user as User
    },
    async remove(id: string) {
      await api.delete(`/users/${id}`)
      await this.fetchAll()
    },
  },
})

