import { DomainError } from "../Shared/DomainError"
import { UserEntity } from "../Shared/UserEntity"
import { UserError } from "../Shared/UserErrors"
import { Result } from "./Result"
import { UserRepository } from "./UserRepository"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<Result<UserEntity>> {
    const validError = this.validUser(user)
    if (validError) return Result.fail<UserEntity>(validError)

    const userOrError = await this.userRepository.create(user)
    if (userOrError.isFailure) return Result.fail<UserEntity>(userOrError.error)

    return Result.ok<UserEntity>(userOrError.getValue())
  } 

  private validUser (user: UserEntity): DomainError {
    if (!user.cpf) {
      return new UserError.InvalidCPF(user.cpf)
    }
    if (user.cpf.length < 8) {
      return new UserError.InvalidCPF(user.cpf)
    } 
    return null
  }
}