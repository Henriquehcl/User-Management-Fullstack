import { describe, expect, it } from 'vitest'
import { Email } from '#src/domain/value-objects/email'
import { User } from '#src/domain/entities/user'

describe('User entity', () => {
  it('creates a valid user', () => {
    const user = User.create({
      id: '1',
      name: 'Jane',
      email: Email.create('jane@example.com'),
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    expect(user.email.value).toBe('jane@example.com')
    expect(user.name).toBe('Jane')
  })

  it('rejects invalid email', () => {
    expect(() => Email.create('not-an-email')).toThrow()
  })
})

