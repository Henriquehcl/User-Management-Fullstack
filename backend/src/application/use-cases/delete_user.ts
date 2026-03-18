import { UserRepository } from '#src/domain/repositories/user_repository'
import { NotFoundError } from '#src/shared/errors/app_error'

export class DeleteUser {
  constructor(private readonly users: UserRepository) {}

  async execute(id: string) {
    const ok = await this.users.delete(id)
    if (!ok) throw new NotFoundError('User not found')
    return { deleted: true }
  }
}

