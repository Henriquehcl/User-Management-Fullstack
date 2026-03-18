import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export class HealthController {
  async index({ response }: HttpContext) {
    const startedAt = Date.now()
    let dbOk = false
    try {
      await db.rawQuery('select 1 as ok')
      dbOk = true
    } catch {
      dbOk = false
    }

    return response.ok({
      status: 'ok',
      db: dbOk ? 'up' : 'down',
      uptimeSeconds: Math.round(process.uptime()),
      responseTimeMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    })
  }
}

