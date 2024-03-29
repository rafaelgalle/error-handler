import axios from "axios"
import { AppError } from "./AppError"
import { UserEntity } from "./UserEntity"
import { Result } from "./Result"

export class UserRepository {
  create (user: any): Promise<Result<UserEntity>> {
    return new Promise((resolve, reject) => {
      axios.post('https://aaaa606858f80add49001733ff9b.mockapi.io/api/products', {}, {})
      .then(response => {
        if (response.status !== 201 || typeof response !== 'object' || typeof response.data !== 'object') {
          resolve(Result.fail<UserEntity>(new AppError.MockApiError('Unexpected return')))
        }
        resolve(Result.ok<UserEntity>(response.data))
      })
      .catch(error => {
        resolve(Result.fail<UserEntity>(error))
      })
    })
  }
}
