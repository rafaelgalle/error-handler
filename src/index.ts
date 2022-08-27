import express from 'express'
import { UserController } from './UserController'

var app = express()

app.get('/handle-error', async function(req, res, next) {
    const fakeRequest = { body: JSON.parse('{"name": "Rafael", "cpf": "0"}') }
    new UserController().createUser(fakeRequest, res, next)
})

app.use((error: any, req: express.Request, res: express.Response , next: express.NextFunction) => {
    console.error('MiddlewareError: ', error)
    const statusCode = error.statusCode ? error.statusCode : 500
    const message = error.message ? error.message : error.toString()
    const classError = error.classError ? error.classError : 'Unmapped'
    return res.status(statusCode).json({ error: message, classError: classError })
})

app.listen(3033)

console.log('APP STARTED')
