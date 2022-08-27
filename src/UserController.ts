import { Result } from "./Result"
import { UserService } from './UserService'
import { UserEntity } from './UserEntity'
import { UserMapper } from './UserMapper'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async createUser(request: any, res: any, next: any) {
    try {
      // throw new Error('asdadsadsa') // To generate an unmapped error
      const userOrError: Result<UserEntity> = await this.userService.create(UserMapper.toEntity(request.body))
      if (userOrError.isFailure) return next(userOrError.error)

      console.log({ statusCode: 201, data: userOrError.getValue() })
      return res.status(201).json(userOrError.getValue()) 
    } catch (error) {
      return next(error)
    }
  }
}
