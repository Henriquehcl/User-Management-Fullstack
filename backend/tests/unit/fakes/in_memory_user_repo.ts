import { User } from '#src/domain/entities/user'
import { Email } from '#src/domain/value-objects/email'
import type { UserCreateInput, UserRepository, UserUpdateInput } from '#src/domain/repositories/user_repository'

export class InMemoryUserRepository implements UserRepository {
  private items = new Map<string, User>()

  async create(input: UserCreateInput): Promise<User> {
    const user = User.create({
      id: input.id,
      name: input.name,
      email: Email.create(input.email),
      password: input.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    this.items.set(user.id, user)
    return user
  }

  async update(id: string, input: UserUpdateInput): Promise<User | null> {
    const current = this.items.get(id)
    if (!current) return null
    const updated = User.create({
      id: current.id,
      name: input.name ?? current.name,
      email: Email.create(input.email ?? current.email.value),
      password: input.password ?? current.password,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    })
    this.items.set(id, updated)
    return updated
  }

  async delete(id: string): Promise<boolean> {
    return this.items.delete(id)
  }

  async list(): Promise<User[]> {
    return [...this.items.values()]
  }

  async getById(id: string): Promise<User | null> {
    return this.items.get(id) ?? null
  }

  async getByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase()
    for (const u of this.items.values()) {
      if (u.email.value === normalized) return u
    }
    return null
  }
}

