import express from 'express'
import { jwtAuth, validate, hasRole } from '../middlewares'
import { ArticleController } from '../controllers'

const route = express.Router()

route.get('/articles/:id', jwtAuth('privilege'), ArticleController.findById)
route.get('/articles', ArticleController.findByCategory)

const adminPath = '/admin/articles'
const adminAccess = [jwtAuth('required'), hasRole('admin')]

route.use(adminPath, adminAccess)
route.get(`${adminPath}/:id`, ArticleController.defaultFindById)
route.delete(`${adminPath}/:id`, ArticleController.deleteById)
route.put(`${adminPath}/:id`, validate('Article', 'update'), ArticleController.updateById)
route.post(adminPath, validate('Article', 'create'), ArticleController.create)
route.get(adminPath, ArticleController.getAll)

export default route