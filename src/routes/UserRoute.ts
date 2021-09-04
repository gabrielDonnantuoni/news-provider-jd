import express from 'express'
import { validate } from '../middlewares'
import { UserControler } from '../controllers'

const route = express.Router()

route.post('/login', validate('User', 'login'), UserControler.login)

route.post('/sing-up', validate('User', 'singUp'), UserControler.singUp)

export default route
