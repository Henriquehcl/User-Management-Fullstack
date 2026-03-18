import { UserRepository } from '#src/domain/repositories/user_repository'
import { NotFoundError } from '#src/shared/errors/app_error'

export class GetUserById {
  constructor(private readonly users: UserRepository) {}

  async execute(id: string) {
    const user = await this.users.getById(id)
    if (!user) throw new NotFoundError('User not found')
    return user
  }
}

