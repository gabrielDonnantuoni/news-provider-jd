import Knex from 'knex'
import KnexConfig from './knexfile'
import { Model } from 'objection'

const knex = Knex(KnexConfig({ withDatabase: true }))

Model.knex(knex)

export * from './models'
