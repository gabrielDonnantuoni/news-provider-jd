import { ArticleModel } from '../database'
import { NotFoundEntityByIdError, IArticleUpdateBody, IArticleCreateBody,
  AlreadyExistsError } from '../helpers'

/**
 * Tries to create a new article with body param. Returns the
 * id number of the new author. If author name already exists, throw
 * proper error.
 * @param body: { authorId, categoryId, title, summary, firstParagraph, body }
 */
export async function create(body: IArticleCreateBody):
Promise<{ id: number }> {
  const newAuthor = await ArticleModel.query().insert(body)
    .catch(() => {
      throw new AlreadyExistsError('Article') 
    })

  return { id: newAuthor.id }
}

/**
 * Tries to get all articles.
 */
export async function getAll():
Promise<ArticleModel[]> {
  return ArticleModel.query()
}

/**
 * Tries to find an article by id.
 */
export async function defaultFindById(id: string):
Promise<ArticleModel> {
  const article = await ArticleModel.query().findById(id)
  if (!article) throw new NotFoundEntityByIdError('Article', id)
  return article
}

/**
* Tries to update an article by id.
*/
export async function updateById(id: string, body: IArticleUpdateBody):
Promise<ArticleModel> {
  const article = await ArticleModel.query().updateAndFetchById(id, body)
  if (!article) throw new NotFoundEntityByIdError('Article', id)
  return article
}

/**
* Tries to delete an article by id.
*/
export async function deleteById(id: string):
Promise<{ deleted: boolean }> {
  const numDeleted = await ArticleModel.query().deleteById(id)
  if (!numDeleted) throw new NotFoundEntityByIdError('Article', id)
  return { deleted: true }
}

/**
 * Tries to find all articles with given category
 * @param category
 */
export async function findByCategory(category: string):
Promise<ArticleModel[]> {
  return ArticleModel.query()
    .withGraphFetched('[author]')
    .modifyGraph('author', (builder) => {
      builder.select(['name', 'picture'])
    })
    .join('categories', 'categoryId', 'categories.id')
    .select('categories.name as category')
    .select('title', 'summary')
    .skipUndefined()
    .where('categories.name', category)
}

/**
 * Tries to find an article by id. Return the following
 * structure: {category, title, summary, firstParagraph, body, 
 * author: { name, picture }}
 * @param id
 */
export async function loggedFindById(id: string):
Promise<ArticleModel> {
  return ArticleModel.query()
    .findById(id)
    .withGraphFetched('[author]')
    .modifyGraph('author', (builder) => {
      builder.select(['name', 'picture'])
    })
    .join('categories', 'categoryId', 'categories.id')
    .select('categories.name as category')
    .select('title', 'summary', 'firstParagraph', 'body')
}

/**
 * Tries to find an article by id. Return the following
 * structure: {category, title, summary, firstParagraph, 
 * author: { name, picture }}
 * @param id
 */
export async function disloggedFindById(id: string):
Promise<ArticleModel> {
  return ArticleModel.query()
    .findById(id)
    .withGraphFetched('[author]')
    .modifyGraph('author', (builder) => {
      builder.select(['name', 'picture'])
    })
    .join('categories', 'categoryId', 'categories.id')
    .select('categories.name as category')
    .select('title', 'summary', 'firstParagraph')
}