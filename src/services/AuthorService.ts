import { AuthorModel } from '../database'
import { IAuthorCreateBody, AlreadyExistsError } from '../helpers'

/**
 * Tries to create a new author with body param. Returns the
 * id number of the new author. If author name already exists, throw
 * proper error.
 * @param body: { name, picture }
 */
export async function create(body: IAuthorCreateBody):
Promise<{ id: number }> {
  const newAuthor = await AuthorModel.query().insert(body)
    .catch(() => {
      throw new AlreadyExistsError('Author') 
    })

  return { id: newAuthor.id }
}
