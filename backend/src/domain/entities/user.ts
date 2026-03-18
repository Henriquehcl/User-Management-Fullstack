import { Email } from '../value-objects/email.js'

export type UserProps = {
  id: string
  name: string
  email: Email
  password: string
  createdAt: Date
  updatedAt: Date
}

export class User {
  private props: UserProps

  private constructor(props: UserProps) {
    if (!props.name || props.name.trim().length < 2) {
      throw new Error('Invalid name')
    }
    this.props = {
      ...props,
      name: props.name.trim(),
    }
  }

  static create(input: Omit<UserProps, 'createdAt' | 'updatedAt'> & { createdAt?: Date; updatedAt?: Date }) {
    const now = new Date()
    return new User({
      ...input,
      createdAt: input.createdAt ?? now,
      updatedAt: input.updatedAt ?? now,
    })
  }

  get id() {
    return this.props.id
  }
  get name() {
    return this.props.name
  }
  get email() {
    return this.props.email
  }
  get password() {
    return this.props.password
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Invalid name')
    }
    this.props.name = name.trim()
    this.touch()
  }

  updateEmail(email: Email) {
    this.props.email = email
    this.touch()
  }

  updatePassword(hashedPassword: string) {
    if (!hashedPassword) throw new Error('Invalid password')
    this.props.password = hashedPassword
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}

