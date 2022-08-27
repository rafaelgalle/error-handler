import { UserEntity } from "../Shared/UserEntity"
import { UserMapper } from "../Shared/UserMapper"
import { UserService } from "./UserService"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async createUserr(request: any, res: any, next: any) {
    const [user, error]: [UserEntity, Error | null] = await this.userService.create(UserMapper.toEntity(request.body))
    if (error) {
      return next(error)
    }

    console.log({ statusCode: 201, data: user })
    return res.status(201).json(user)
  }
}
