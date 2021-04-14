import { UserEntity } from "../Shared/UserEntity"
import { Either, left, Result, right } from "./Result"
import { UserError } from "./UserErrors"
import { UserRepository } from "./UserRepository"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<Response> {
    let userOrError = this.validUser(user)

    if (userOrError.isLeft()) return left(userOrError.value)

    userOrError = await this.userRepository.create(user)
    if (userOrError.isLeft()) return left(userOrError.value)

    return right(Result.ok(userOrError.value.getValue()))
  } 

  private validUser (user: UserEntity): Either<UserError.UserInvalidError, Result<UserEntity>> {
    if (!user.cpf) {
      return left(UserError.UserInvalidError.create());
    }
    if (user.cpf.length < 8) {
      return left(UserError.UserInvalidError.create());
    }
    return right(Result.ok<UserEntity>(user))
  }
}

type Response = Either<
  UserError.UserAlreadyExists | 
  UserError.CPFInvalidError
  ,
  Result<UserEntity> // OK 
>
