import { ArticleModel } from '../database'

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