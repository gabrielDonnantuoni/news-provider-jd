import { AuthorModel } from '../database'
import { IAuthorCreateBody, IAuthorUpdateBody, AlreadyExistsError, NotFoundEntityByIdError } from '../helpers'

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

/**
 * Tries to get all authors.
 */
export async function getAll():
Promise<AuthorModel[]> {
  return AuthorModel.query()
}

/**
 * Tries to find an author by id.
 */
export async function findById(id: string):
Promise<AuthorModel> {
  const author = await AuthorModel.query().findById(id)
  if (!author) throw new NotFoundEntityByIdError('Author', id)
  return author
}

/**
 * Tries to update an author by id.
 */
export async function updateById(id: string, body: IAuthorUpdateBody):
Promise<AuthorModel> {
  const author = await AuthorModel.query().updateAndFetchById(id, body)
  if (!author) throw new NotFoundEntityByIdError('Author', id)
  return author
}

/**
 * Tries to delete an author by id.
 */
export async function deleteById(id: string):
Promise<{ deleted: boolean }> {
  const numDeleted = await AuthorModel.query().deleteById(id)
  if (!numDeleted) throw new NotFoundEntityByIdError('Author', id)
  return { deleted: true }
}
