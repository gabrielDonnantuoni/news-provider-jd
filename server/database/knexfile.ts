import Knex from 'knex'
import path from 'path'
import { getConnectionByNodeEnv } from '../utils'

const connection = getConnectionByNodeEnv()

export const database = connection.database

interface Options {
  withDatabase?: boolean
}

function config(options?: Options): Knex.Config {
  const myConnection = { ...connection }
  const withDatabase = options?.withDatabase
  if (!withDatabase) myConnection.database = undefined

  return {
    client: 'postgresql',
    connection: myConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
      extension: 'ts',
    },
  }
}

export default config
