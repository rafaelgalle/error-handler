import { DomainError } from "../Shared/DomainError"

export type Response<T> = [T, DomainError]

export class Responsee {
  public static ok<T> (value: T) : Response<T> {
    return [value, null]
  }
  public static fail<T> (error: DomainError) : Response<T> {
    return [null as unknown as T, error]
  }
}
