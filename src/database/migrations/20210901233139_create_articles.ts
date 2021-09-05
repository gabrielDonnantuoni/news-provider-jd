import Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('articles', (table) => {
    table.increments()
    table
      .integer('authorId')
      .unsigned()
      .references('id')
      .inTable('authors')
      .onDelete('SET NULL')
    table
      .integer('categoryId')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('SET NULL')
    table.string('title').notNullable()
    table.string('summary', 500).notNullable()
    table.string('firstParagraph', 1000).notNullable()
    table.string('body', 2000).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('articles')
}