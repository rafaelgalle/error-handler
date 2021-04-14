import { Result } from "./Result"
import { UserEntity } from "../Shared/UserEntity"
import { UserRepository } from "./UserRepository"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<Result<UserEntity>> {
    let userOrError = this.validUser(user)
    if (userOrError.isFailure) return Result.fail<UserEntity>(userOrError.error)

    userOrError = await this.userRepository.create(user)
    if (userOrError.isFailure) return Result.fail<UserEntity>(userOrError.error)

    return Result.ok<UserEntity>(userOrError.getValue())
  } 

  private validUser (user: UserEntity): Result<UserEntity> {
    if (!user.cpf) {
      return Result.fail<UserEntity>('Cpf não informado')
    }
    if (user.cpf.length < 8) {
      return Result.fail<UserEntity>('Cpf invalido')
    } 
    return Result.ok<UserEntity>(user)
  }
}