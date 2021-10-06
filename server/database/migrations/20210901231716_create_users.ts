import Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('firstName', 50).notNullable()
    table.string('lastName', 200).notNullable()
    table.string('email', 100).notNullable().unique('user_unique_email')
    table.string('password', 200).notNullable()
    table.string('role', 50).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
