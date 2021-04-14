import axios from "axios"
import { UserEntity } from "../Shared/UserEntity"
import { AppError } from "./AppError"
import { Either, left, Result, right } from "./Result"
import { UserError } from "./UserErrors"

export class UserRepository {
  create (user: any): Promise<Response> {
    return new Promise((resolve, reject) => {
      axios.post('https://aaa606858f80add49001733ff9b.mockapi.io/api/products', {}, {})
      .then(response => {
        if (response.status !== 201) resolve(left(AppError.RequestError.create('Status code diferente de 201')))
        if (typeof response !== 'object') resolve(left(AppError.RequestError.create('Retorno diferente do esperado')))
        if (typeof response.data !== 'object') resolve(left(AppError.RequestError.create('Retorno diferente do esperado')))
        resolve(right(Result.ok<UserEntity>(response.data)))
      })
      .catch(error => {
        resolve(left(AppError.FenixError.create(error)))
      })
    })
  }
}

type Response = Either<
  UserError.UserAlreadyExists | 
  AppError.FenixError
  ,
  Result<UserEntity> // OK 
>
