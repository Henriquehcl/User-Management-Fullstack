import { UserRepository } from '#src/domain/repositories/user_repository'
import { JwtService } from '#src/application/services/jwt_service'
import type { PasswordHasher } from '#src/application/services/password_hasher'
import { UnauthorizedError } from '#src/shared/errors/app_error'

export type AuthenticateUserInput = {
  email: string
  password: string
}

export class AuthenticateUser {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
    private readonly hasher: PasswordHasher
  ) {}

  async execute(input: AuthenticateUserInput) {
    const user = await this.users.getByEmail(input.email.trim().toLowerCase())
    if (!user) throw new UnauthorizedError('Invalid credentials')

    const ok = await this.hasher.verify(user.password, input.password)
    if (!ok) throw new UnauthorizedError('Invalid credentials')

    const token = this.jwt.sign({ sub: user.id, email: user.email.value })
    return { token, user: user.toJSON() }
  }
}

