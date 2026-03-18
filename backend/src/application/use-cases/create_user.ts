import { randomUUID } from 'node:crypto'
import { Email } from '#src/domain/value-objects/email'
import { UserRepository } from '#src/domain/repositories/user_repository'
import { ConflictError } from '#src/shared/errors/app_error'
import type { PasswordHasher } from '#src/application/services/password_hasher'

export type CreateUserInput = {
  name: string
  email: string
  password: string
}

export class CreateUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher
  ) {}

  async execute(input: CreateUserInput) {
    const email = Email.create(input.email)
    const existing = await this.users.getByEmail(email.value)
    if (existing) throw new ConflictError('Email already in use')

    const hashedPassword = await this.hasher.hash(input.password)
    const user = await this.users.create({
      id: randomUUID(),
      name: input.name,
      email: email.value,
      password: hashedPassword,
    })

    return user
  }
}

