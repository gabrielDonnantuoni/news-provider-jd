import express from 'express'
import { validate, jwtAuth, hasRole } from '../middlewares'
import { AuthorController } from '../controllers'

const route = express.Router()

const adminPath = '/admin/authors'
const adminAccess = [jwtAuth('required'), hasRole('admin')]

route.use(adminPath, adminAccess)
route.get(`${adminPath}/:id`, AuthorController.findById)
route.delete(`${adminPath}/:id`, AuthorController.deleteById)
route.put(`${adminPath}/:id`, validate('Author', 'update'), AuthorController.updateById)
route.post(adminPath, validate('Author', 'create'), AuthorController.create)
route.get(adminPath, AuthorController.getAll)


export default route