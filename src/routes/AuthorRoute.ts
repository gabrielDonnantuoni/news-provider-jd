import express from 'express'
import { validate, jwtAuth, hasRole } from '../middlewares'
import { AuthorController } from '../controllers'

const route = express.Router()

const adminPath = '/admin/authors'
const adminAccess = [jwtAuth('required'), hasRole('admin')]

route.use(adminAccess)
route.post(adminPath, validate('Author', 'create'), AuthorController.create)


export default route