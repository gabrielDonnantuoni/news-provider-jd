import Knex from 'knex'
import KnexConfig, { database } from '../knexfile'

async function init() {
  try {
    const knexWithDb = Knex(KnexConfig({ withDatabase: true }))
    await knexWithDb.migrate.latest()
    console.log('Migrations done')
    await knexWithDb.seed.run()
    console.log('Seeds populated')
    await knexWithDb.destroy()
    process.exit(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.message === `database "${database}" does not exist`) {
      const knexWithoutDb = Knex(KnexConfig())

      await knexWithoutDb.raw(`CREATE DATABASE "${database}";`)
      await knexWithoutDb.destroy()
      init()
    } else {
      console.log(err)
    }
  }
}

init()