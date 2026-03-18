import { UserRepository } from '#src/domain/repositories/user_repository'

export class ListUsers {
  constructor(private readonly users: UserRepository) {}

  async execute() {
    return this.users.list()
  }
}

