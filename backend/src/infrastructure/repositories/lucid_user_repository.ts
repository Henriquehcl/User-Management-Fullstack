import db from '@adonisjs/lucid/services/db'
import { User } from '#src/domain/entities/user'
import { Email } from '#src/domain/value-objects/email'
import type { UserCreateInput, UserRepository, UserUpdateInput } from '#src/domain/repositories/user_repository'

type DbUserRow = {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

function mapRow(row: DbUserRow): User {
  return User.create({
    id: row.id,
    name: row.name,
    email: Email.create(row.email),
    password: row.password,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
}

export class LucidUserRepository implements UserRepository {
  async create(input: UserCreateInput): Promise<User> {
    const [row] = await db
      .insertQuery()
      .table('users')
      .insert({
        id: input.id,
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .returning(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])

    return mapRow(row as DbUserRow)
  }

  async update(id: string, input: UserUpdateInput): Promise<User | null> {
    const [row] = await db
      .from('users')
      .where('id', id)
      .update({
        ...input,
        updated_at: new Date(),
      })
      .returning(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])

    if (!row) return null
    return mapRow(row as DbUserRow)
  }

  async delete(id: string): Promise<boolean> {
    const affected = (await db.from('users').where('id', id).delete()) as unknown as number
    return affected > 0
  }

  async list(): Promise<User[]> {
    const rows = await db
      .from('users')
      .select(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])
      .orderBy('created_at', 'desc')
    return rows.map((r) => mapRow(r as DbUserRow))
  }

  async getById(id: string): Promise<User | null> {
    const row = await db
      .from('users')
      .select(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])
      .where('id', id)
      .first()
    return row ? mapRow(row as DbUserRow) : null
  }

  async getByEmail(email: string): Promise<User | null> {
    const row = await db
      .from('users')
      .select(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])
      .where('email', email)
      .first()
    return row ? mapRow(row as DbUserRow) : null
  }
}

