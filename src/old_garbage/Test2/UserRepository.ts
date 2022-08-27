import axios from "axios"
import { AppError } from "../Shared/AppErrors"
import { UserEntity } from "../Shared/UserEntity"

export class UserRepository {
  create (user: any): Promise<[UserEntity, Error | null]> {
    return new Promise((resolve, reject) => {
      axios.post('https://aaaa606858f80add49001733ff9b.mockapi.io/api/products', {}, {})
      .then(response => {
        if (response.status !== 201 || typeof response !== 'object' || typeof response.data !== 'object') {
          return resolve([{} as UserEntity, new AppError.FenixError('')])
        }
        resolve([response.data, null])
      })
      .catch(error => {
        resolve([{} as UserEntity, new AppError.FenixError(error.message)])
      })
    })
  }
}