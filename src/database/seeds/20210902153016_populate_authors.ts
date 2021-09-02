import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('authors').del()

  await knex('authors').insert([
    {
      id: 1,
      name: 'Melissa Thorn',
      picture: 'https://randomuser.me/api/portraits/women/64.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      picture: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      id: 3,
      name: 'Jane Doe',
      picture: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      id: 4,
      name: 'Isaac Lee',
      picture: 'https://randomuser.me/api/portraits/men/21.jpg',
    },
    {
      id: 5,
      name: 'Emily Buffet',
      picture: 'https://randomuser.me/api/portraits/women/16.jpg',
    },
  ])
}