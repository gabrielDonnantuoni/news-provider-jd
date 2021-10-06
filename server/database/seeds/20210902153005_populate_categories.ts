import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del()

  await knex('categories').insert([
    {
      id: 1,
      name: 'Technology',
    },
    {
      id: 2,
      name: 'Health',
    },
    {
      id: 3,
      name: 'Business',
    },
    {
      id: 4,
      name: 'Cars',
    },
    {
      id: 5,
      name: 'Entertainment',
    },
    {
      id: 6,
      name: 'Politics',
    },
    {
      id: 7,
      name: 'Science',
    },
    {
      id: 8,
      name: 'Finances',
    },
  ])
}