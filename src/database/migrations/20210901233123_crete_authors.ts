import Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('authors', (table) => {
    table.increments()
    table.string('name').notNullable().unique('author_unique_name')
    table.string('picture').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('authors')
}
