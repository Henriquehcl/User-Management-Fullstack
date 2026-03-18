import jwt from 'jsonwebtoken'
import env from '#start/env'
import { UnauthorizedError } from '#src/shared/errors/app_error'

export type JwtPayload = {
  sub: string
  email: string
}

export class JwtService {
  private readonly secret: string
  private readonly expiresIn: jwt.SignOptions['expiresIn']

  constructor() {
    this.secret = env.get('JWT_SECRET')
    this.expiresIn = env.get('JWT_EXPIRES_IN') as unknown as jwt.SignOptions['expiresIn']
  }

  sign(payload: JwtPayload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret)
      if (typeof decoded !== 'object' || decoded === null) {
        throw new UnauthorizedError('Invalid token')
      }
      const sub = (decoded as any).sub
      const email = (decoded as any).email
      if (!sub || !email) throw new UnauthorizedError('Invalid token')
      return { sub, email }
    } catch {
      throw new UnauthorizedError('Invalid token')
    }
  }
}

