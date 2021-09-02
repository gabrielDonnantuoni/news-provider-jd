import Knex from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('__Admin__', 12),
      role: 'admin',
    },
    {
      id: 2,
      firstName: 'fulano',
      lastName: 'de tal',
      email: 'fulano@example.com',
      password: bcrypt.hashSync('supersecret', 12),
      role: 'client',
    },
  ])
}
