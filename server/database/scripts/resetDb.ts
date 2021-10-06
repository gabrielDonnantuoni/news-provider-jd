import Knex from 'knex'
import KnexConfig, { database } from '../knexfile'

export async function resetDb(): Promise<void> {
  try {
    const knexWithDb = Knex(KnexConfig({ withDatabase: true }))
    await knexWithDb.migrate.latest()
    console.log(`Using database: ${database}`)
    console.log('Migrations done')
    await knexWithDb.seed.run()
    console.log('Seeds ran')
    await knexWithDb.destroy()
  } catch (err: any) {
    if (err.message === `database "${database}" does not exist`) {
      const knexWithoutDb = Knex(KnexConfig())

      await knexWithoutDb.raw(`CREATE DATABASE "${database}";`)
      await knexWithoutDb.destroy()
      await resetDb()
    } else {
      console.log(err)
    }
  }
}

