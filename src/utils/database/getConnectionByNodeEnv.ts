import { config as dotenv } from 'dotenv'
import path from 'path'

dotenv({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

interface Connection {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
}

export default function (): Connection {
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

