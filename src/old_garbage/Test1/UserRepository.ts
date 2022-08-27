import axios from "axios"
import { Result } from "./Result"
import { UserEntity } from "../Shared/UserEntity"

export class UserRepository {
  create (user: any): Promise<Result<UserEntity>> {
    return new Promise((resolve, reject) => {
      axios.post('https://606858f80add49001733ff9b.mockapi.io/api/products', {}, {})
      .then(response => {
        if (response.status !== 201 || typeof response !== 'object' || typeof response.data !== 'object') {
          return resolve(Result.fail<UserEntity>('Retorno diferente do esperado'))
        }
        resolve(Result.ok<UserEntity>(response.data))
      })
      .catch(error => {
        resolve(Result.fail<UserEntity>('Teste catch: ' + error.message))
      })
    })
  }
}
