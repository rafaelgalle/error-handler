import { Result, Right, Either, Left, left, right } from "./Result"
import { AppError } from './AppError'
import { UserError } from './UserErrors'
import { UserService } from "./UserService"
import { UserMapper } from "../Shared/UserMapper"
import { UserEntity } from "../Shared/UserEntity"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async createUserr(request: any, res: any, next: any) {
    try {
      const userOrError: Response = await this.userService.create(UserMapper.toEntity(request.body))
      if (userOrError.isLeft()) {
        return next(userOrError.value.getValue())
      }
  
      console.log({ statusCode: 201, data: userOrError.value.getValue() })
      return res.status(201).json(userOrError.value.getValue())
    } catch (error) {
      return next(error)
    }
  }
}

type Response = Either<
  UserError.UserAlreadyExists | 
  UserError.CPFInvalidError
  ,
  Result<UserEntity> // OK 
>
