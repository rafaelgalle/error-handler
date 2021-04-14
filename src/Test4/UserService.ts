import { DomainError } from "../Shared/DomainError"
import { UserError } from "../Shared/UserErrors"
import { UserEntity } from "../Shared/UserEntity"
import { UserRepository } from "./UserRepository"
import { Response, Responsee } from './Response'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async create(user: UserEntity): Promise<Response<UserEntity>> {
    const errorValidUser = this.validUser(user)
    if (errorValidUser) return Responsee.fail<UserEntity>(errorValidUser)

    const [newUser, errorCreate] = await this.userRepository.create(user)
    if (errorCreate) return Responsee.fail<UserEntity>(errorCreate)

    return Responsee.ok<UserEntity>(newUser)
  } 

  private validUser (user: UserEntity): DomainError {
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