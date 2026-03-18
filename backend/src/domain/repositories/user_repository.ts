import { User } from '../entities/user.js'

export type UserCreateInput = {
  id: string
  name: string
  email: string
  password: string
}

export type UserUpdateInput = {
  name?: string
  email?: string
  password?: string
}

export interface UserRepository {
  create(input: UserCreateInput): Promise<User>
  update(id: string, input: UserUpdateInput): Promise<User | null>
  delete(id: string): Promise<boolean>
  list(): Promise<User[]>
  getById(id: string): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
}

