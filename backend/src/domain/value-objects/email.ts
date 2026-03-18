export class Email {
  readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(raw: string): Email {
    const value = raw.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('Invalid email')
    }
    return new Email(value)
  }
}

