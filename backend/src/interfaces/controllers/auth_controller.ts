import type { HttpContext } from '@adonisjs/core/http'
import { container } from '#src/infrastructure/container'
import { loginValidator, registerValidator } from '#src/interfaces/validators/auth_validators'

export class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await container.useCases.createUser().execute(payload)
    return response.created({ user: user.toJSON() })
  }

  async login({ request }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    return container.useCases.authenticateUser().execute(payload)
  }
}

