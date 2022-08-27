import { UserEntity } from "../Shared/UserEntity"
import { UserError } from "../Shared/UserErrors"
import { UserRepository } from "./UserRepository"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<[UserEntity, Error | null]> {
    const errorValidUser = this.validUser(user)
    if (errorValidUser) return [{} as UserEntity, errorValidUser]

    const [newUser, errorCreate] = await this.userRepository.create(user)
    if (errorCreate) return [{} as UserEntity, errorCreate]

    return [newUser, null]
  } 

  private validUser (user: UserEntity): Error | null {
    if (!user.cpf) {
      return new UserError.InvalidCPF(user.cpf)
    }
    if (user.cpf.length < 8) {
      return new UserError.InvalidCPF(user.cpf)
    }
    if (user.name.length < 4) {
      return new UserError.InvalidCPF(user.name)
    }
    return null
  }
}
