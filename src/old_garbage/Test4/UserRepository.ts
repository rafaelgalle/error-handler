import axios from "axios"
import { AppError } from "../Shared/AppErrors"
import { UserEntity } from "../Shared/UserEntity"
import { Response, Responsee } from './Response'

export class UserRepository {
  create (user: any): Promise<Response<UserEntity>> {
    return new Promise((resolve, reject) => {
      axios.post('https://aaaa606858f80add49001733ff9b.mockapi.io/api/products', {}, {})
      .then(response => {
        if (response.status !== 201 || typeof response !== 'object' || typeof response.data !== 'object') {
          resolve(Responsee.fail<UserEntity>(new AppError.FenixError('')))
        } 
        resolve(Responsee.ok<UserEntity>(response.data))
      })
      .catch(error => {
        resolve(Responsee.fail<UserEntity>(new AppError.FenixError(error.message)))
      })
    })
  }
}