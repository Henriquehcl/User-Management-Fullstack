import type { HttpContext } from '@adonisjs/core/http'
import { container } from '#src/infrastructure/container'
import { createUserValidator, updateUserValidator } from '#src/interfaces/validators/user_validators'

export class UsersController {
  async list(_: HttpContext) {
    const users = await container.useCases.listUsers().execute()
    return { users: users.map((u) => u.toJSON()) }
  }

  async getById({ params }: HttpContext) {
    const user = await container.useCases.getUserById().execute(params.id)
    return { user: user.toJSON() }
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await container.useCases.createUser().execute(payload)
    return response.created({ user: user.toJSON() })
  }

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    const user = await container.useCases.updateUser().execute({ id: params.id, ...payload })
    return { user: user.toJSON() }
  }

  async delete({ params, response }: HttpContext) {
    await container.useCases.deleteUser().execute(params.id)
    return response.noContent()
  }
}

