import express from 'express'
import { validate } from '../middlewares'
import { UserControler } from '../controllers'

const route = express.Router()

route.post('/login', validate('User', 'login'), UserControler.login)

export default route
