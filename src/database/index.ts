import Knex from 'knex'
import KnexConfig from './knexfile'
import { Model } from 'objection'

const knex = Knex(KnexConfig({ withDatabase: true }))

Model.knex(knex)

export { default as UserModel } from './models/User'
export { default as CategoryModel } from './models/Category'
export { default as AuthorModel } from './models/Author'
export { default as ArticleModel } from './models/Article'
