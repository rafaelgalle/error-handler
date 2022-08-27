export class UserEntity {
  private _id: string
  private _name: string
  private _cpf: string

  constructor () {
    this._id = ''
    this._name = ''
    this._cpf = ''
  }

  get id (): string { return this._id }
  set id (value: string) { this._id = value }

  get name (): string { return this._name }
  set name (value: string) { this._name = value }

  get cpf (): string { return this._cpf }
  set cpf (value: string) { this._cpf = value }

  getEntity () {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf
    }
  }
}
