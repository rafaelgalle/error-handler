import { Result } from './Result'
import { DomainError } from './DomainError'

export namespace UserError {

  export class UserInvalidError extends Result<DomainError> {
    public constructor () {
      super(false, {
        classError: `UserError.UserInvalidError`,
        message: `The invalid user.`,
        statusCode: 400
      })
    }

    public static create (): UserInvalidError {
      return new UserInvalidError();
    }
  }

  export class UserAlreadyExists extends Result<DomainError> {    
    public constructor (username: string) {
      super(false, {
        classError: `UserAlreadyExists`,
        message: `The user "${username}" has already exists.`,
        statusCode: 400
      })
    }

    public static create (username: string): UserAlreadyExists {
      return new UserAlreadyExists(username);
    }
  }

  export class CPFInvalidError extends Result<DomainError> {    
    public constructor (cpf: string) {
      super(false, {
        classError: `CPFInvalidError`,
        message: `The email "${cpf}" is invalid.`,
        statusCode: 400
      })
    }

    public static create (cpf: string): CPFInvalidError {
      return new CPFInvalidError(cpf);
    }
  }
}