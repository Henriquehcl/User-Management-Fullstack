export class AppError extends Error {
  readonly code: string
  readonly status: number

  constructor(message: string, code: string, status: number) {
    super(message)
    this.code = code
    this.status = status
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 'NOT_FOUND', 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 'CONFLICT', 409)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation error') {
    super(message, 'VALIDATION_ERROR', 422)
  }
}

