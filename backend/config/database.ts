import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        paths: ['database/migrations'],
        naturalSort: true,
      },
    },
  },
})

export default databaseConfig

