import Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('authors', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('picture').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('authors')
}
