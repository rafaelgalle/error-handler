import express from 'express'
import { UserController as userOne } from './Test1/UserController'
import { UserController as userTwo } from './Test2/UserController'
import { UserController as userThree } from './Test3/UserController'
import { UserController as userFour } from './Test4/UserController'
import { UserController as userFive } from './Test5/UserController'

var app = express()

app.get('/handle-error-one', async function(req, res, next) {
    const reqFake = { body: JSON.parse('{"name": "Rafael", "cpf": "0"}') }
    const userController = new userOne()
    userController.createUserr(reqFake, res, next)
})

app.get('/handle-error-two', async function(req, res, next) {
    const reqFake = { body: JSON.parse('{"name": "Rafael", "cpf": "000000000"}') }
    const userController = new userTwo()
    userController.createUserr(reqFake, res, next)
})

app.get('/handle-error-three', async function(req, res, next) {
    const reqFake = { body: JSON.parse('{"name": "Rafael", "cpf": "000000000"}') }
    const userController = new userThree()
    userController.createUserr(reqFake, res, next)
})

app.get('/handle-error-four', async function(req, res, next) {
    const reqFake = { body: JSON.parse('{"name": "Rafael", "cpf": "000000000"}') }
    const userController = new userFour()
    userController.createUserr(reqFake, res, next)
})

app.get('/handle-error-five', async function(req, res, next) {
    const reqFake = { body: JSON.parse('{"name": "Rafael", "cpf": "0"}') }
    const userController = new userFive()
    userController.createUserr(reqFake, res, next)
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
