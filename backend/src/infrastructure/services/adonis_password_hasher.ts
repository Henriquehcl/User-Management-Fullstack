import hash from '@adonisjs/core/services/hash'
import type { PasswordHasher } from '#src/application/services/password_hasher'

export class AdonisPasswordHasher implements PasswordHasher {
  hash(plain: string) {
    return hash.make(plain)
  }

  verify(hashed: string, plain: string) {
    return hash.verify(hashed, plain)
  }
}

