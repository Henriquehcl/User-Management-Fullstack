import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { api } from '@/services/api/http'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts unauthenticated when no token', () => {
    const auth = useAuthStore()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('stores token/user on login', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({
      data: { token: 't', user: { id: '1', name: 'n', email: 'e' } },
    } as any)

    const auth = useAuthStore()
    await auth.login('e', 'p')

    expect(auth.token).toBe('t')
    expect(auth.user?.email).toBe('e')
    expect(localStorage.getItem('token')).toBe('t')
  })
})

