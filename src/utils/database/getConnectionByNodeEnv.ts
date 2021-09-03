import { config as dotenv } from 'dotenv'
import path from 'path'
import { IConnection } from '../../helpers'

dotenv({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

export function getConnectionByNodeEnv(): IConnection {
  let prefix

  switch (process.env.NODE_ENV) {
    case 'test':
      prefix = 'TEST'
      break
    case 'production':
      prefix = 'PROD'
      break
    default:
      prefix = 'DEV'
  }

  return {
    host: process.env[`${prefix}_POSTGRE_HOST`],
    port: parseInt(process.env[`${prefix}_POSTGRE_PORT`] as string, 10),
    user: process.env[`${prefix}_POSTGRE_USER`],
    password: process.env[`${prefix}_POSTGRE_PASSWORD`],
    database: process.env[`${prefix}_POSTGRE_DB`],
  }
}

