import { describe, expect, it } from 'vitest'
import { CreateUser } from '#src/application/use-cases/create_user'
import { InMemoryUserRepository } from './fakes/in_memory_user_repo.js'

describe('CreateUser use case', () => {
  it('creates user and enforces unique email', async () => {
    const repo = new InMemoryUserRepository()
    const createUser = new CreateUser(repo, {
      hash: async (plain) => `hashed:${plain}`,
      verify: async (hashed, plain) => hashed === `hashed:${plain}`,
    })

    const user1 = await createUser.execute({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
    })

    expect(user1.email.value).toBe('admin@example.com')

    await expect(
      createUser.execute({
        name: 'Other',
        email: 'admin@example.com',
        password: 'password123',
      })
    ).rejects.toThrow(/Email already in use/)
  })
})

