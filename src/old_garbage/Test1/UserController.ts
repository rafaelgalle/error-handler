import { Result } from "./Result"
import { UserEntity } from "../Shared/UserEntity"
import { UserMapper } from "../Shared/UserMapper"
import { UserService } from "./UserService"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async createUserr(request: any, res: any, next: any) {
    const userOrError: Result<UserEntity> = await this.userService.create(UserMapper.toEntity(request.body))
    if (userOrError.isFailure) {
      return next(userOrError.error)
    }
    console.log({ statusCode: 201, data: userOrError.getValue() })
    return res.status(201).json(userOrError.getValue())
  }
}
