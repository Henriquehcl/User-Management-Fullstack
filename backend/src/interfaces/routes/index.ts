import type { Router } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'
import { AuthController } from '#src/interfaces/controllers/auth_controller'
import { DocsController } from '#src/interfaces/controllers/docs_controller'
import { HealthController } from '#src/interfaces/controllers/health_controller'
import { UsersController } from '#src/interfaces/controllers/users_controller'

export function registerRoutes(router: Router) {
  const auth = new AuthController()
  const users = new UsersController()
  const health = new HealthController()
  const docs = new DocsController()

  router.get('/health', (ctx) => health.index(ctx))

  router.get('/docs', (ctx) => docs.ui(ctx))
  router.get('/docs/openapi.json', (ctx) => docs.openapi(ctx))

  router.post('/auth/register', (ctx) => auth.register(ctx))
  router.post('/auth/login', (ctx) => auth.login(ctx))

  router
    .group(() => {
      router.get('/users', (ctx) => users.list(ctx))
      router.get('/users/:id', (ctx) => users.getById(ctx))
      router.post('/users', (ctx) => users.create(ctx))
      router.put('/users/:id', (ctx) => users.update(ctx))
      router.delete('/users/:id', (ctx) => users.delete(ctx))
    })
    .use(middleware.auth())
}

