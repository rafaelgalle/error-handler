import { DomainError } from "./DomainError"
import { UserEntity } from "./UserEntity"
import { UserError } from "./UserErrors"
import { Result } from "./Result"
import { UserRepository } from "./UserRepository"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<Result<UserEntity>> {
    const error = this.validUser(user)
    if (error) return Result.fail<UserEntity>(error)

    const userOrError = await this.userRepository.create(user)
    if (userOrError.isFailure) return Result.fail<UserEntity>(userOrError.error)

    return Result.ok<UserEntity>(userOrError.getValue())
  }

  private validUser (user: UserEntity): DomainError {
    if (!user.cpf) return new UserError.InvalidCPF(user.cpf)
    if (user.cpf.length < 8) return new UserError.InvalidCPF(user.cpf)
    return null
  }
}