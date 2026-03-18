import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequestLoggerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const start = Date.now()
    try {
      return await next()
    } finally {
      const durationMs = Date.now() - start
      ctx.logger.info(
        {
          method: ctx.request.method(),
          url: ctx.request.url(true),
          status: ctx.response.getStatus(),
          durationMs,
          ip: ctx.request.ip(),
        },
        'http_request'
      )
    }
  }
}

