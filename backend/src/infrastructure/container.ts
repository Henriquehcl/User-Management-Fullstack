import { JwtService } from '#src/application/services/jwt_service'
import { AdonisPasswordHasher } from '#src/infrastructure/services/adonis_password_hasher'
import { AuthenticateUser } from '#src/application/use-cases/authenticate_user'
import { CreateUser } from '#src/application/use-cases/create_user'
import { DeleteUser } from '#src/application/use-cases/delete_user'
import { GetUserById } from '#src/application/use-cases/get_user_by_id'
import { ListUsers } from '#src/application/use-cases/list_users'
import { UpdateUser } from '#src/application/use-cases/update_user'
import { LucidUserRepository } from '#src/infrastructure/repositories/lucid_user_repository'

const users = new LucidUserRepository()
const jwt = new JwtService()
const hasher = new AdonisPasswordHasher()

export const container = {
  users,
  jwt,
  hasher,
  useCases: {
    createUser: () => new CreateUser(users, hasher),
    updateUser: () => new UpdateUser(users, hasher),
    deleteUser: () => new DeleteUser(users),
    listUsers: () => new ListUsers(users),
    getUserById: () => new GetUserById(users),
    authenticateUser: () => new AuthenticateUser(users, jwt, hasher),
  },
}

