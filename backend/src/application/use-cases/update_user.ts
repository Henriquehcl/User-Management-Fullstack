import { Email } from '#src/domain/value-objects/email'
import { UserRepository } from '#src/domain/repositories/user_repository'
import { ConflictError, NotFoundError } from '#src/shared/errors/app_error'
import type { PasswordHasher } from '#src/application/services/password_hasher'

export type UpdateUserInput = {
  id: string
  name?: string
  email?: string
  password?: string
}

export class UpdateUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher
  ) {}

  async execute(input: UpdateUserInput) {
    const current = await this.users.getById(input.id)
    if (!current) throw new NotFoundError('User not found')

    const patch: { name?: string; email?: string; password?: string } = {}

    if (input.email) {
      const email = Email.create(input.email)
      const existing = await this.users.getByEmail(email.value)
      if (existing && existing.id !== input.id) throw new ConflictError('Email already in use')
      patch.email = email.value
    }

    if (input.name) patch.name = input.name

    if (input.password) {
      patch.password = await this.hasher.hash(input.password)
    }

    const updated = await this.users.update(input.id, patch)
    if (!updated) throw new NotFoundError('User not found')
    return updated
  }
}

