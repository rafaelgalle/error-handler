export namespace AppError {
  export class FenixError extends Error {
    constructor(value: string) {
      super(`Error connection FenixError: '${value}'`)
      this.statusCode = 502
      this.classError = 'FenixError'
    }
  }
  export class Fucked extends Error {
    constructor(value: string) {
      super(`Holy fuck '${value}'`)
      this.statusCode = 500
      this.classError = 'Fucked'
    }
  }
}