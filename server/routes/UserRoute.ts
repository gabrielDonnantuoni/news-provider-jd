import express from 'express'
import { validate } from '../middlewares'
import { UserController } from '../controllers'

const route = express.Router()

route.post('/login', validate('User', 'login'), UserController.login)

route.post('/sing-up', validate('User', 'singUp'), UserController.singUp)

export default route
