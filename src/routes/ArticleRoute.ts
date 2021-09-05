import express from 'express'
import { jwtAuth } from '../middlewares'
import { ArticleController } from '../controllers'

const route = express.Router()

route.get('/articles/:id', jwtAuth('privilege'), ArticleController.findById)

route.get('/articles', ArticleController.findByCategory)

export default route