import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { container } from '#src/infrastructure/container'
import { UnauthorizedError } from '#src/shared/errors/app_error'

export type AuthUser = { id: string; email: string }

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const header = ctx.request.header('authorization')
    if (!header) throw new UnauthorizedError('Missing Authorization header')

    const [, token] = header.split(' ')
    if (!token) throw new UnauthorizedError('Missing bearer token')

    const payload = container.jwt.verify(token)
    ;(ctx as any).authUser = { id: payload.sub, email: payload.email } satisfies AuthUser

    return next()
  }
}

