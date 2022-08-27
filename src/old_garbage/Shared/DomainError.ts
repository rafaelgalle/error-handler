export type DomainError = Error | null

export class DomainErrorBase extends Error {
  public statusCode?: number
  public classError?: string
  constructor(value: string) {
    super(value)
  }
}
