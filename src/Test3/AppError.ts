import { Result } from "./Result";
import { DomainError } from "./DomainError";

export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor (err: any) {
      super(false, {
        classError: `UnexpectedError`,
        message: `An unexpected error occurred.`,
        error: err
      })
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class FenixError extends Result<DomainError> {
    public constructor (err: any) {
      super(false, {
        classError: `FenixError`,
        message: `An unexpected error occurred.`,
        error: err
      })
    }

    public static create (err: any): FenixError {
      return new FenixError(err);
    }
  }

  export class RequestError extends Result<DomainError> {
    public constructor (message: string) {
      super(false, {
        classError: `RequestError`,
        message: `An unexpected error occurred: ${message}`
      })
    }

    public static create (message: string): RequestError {
      return new RequestError(message);
    }
  }
}