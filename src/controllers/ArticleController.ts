import { ArticleService } from '../services'
import { tryCatchWrapper as tcw } from '../utils'
import { Http } from '@status/codes'

/**
 * Middeware that tries to return all articles with
 * the category received in the url query string
 */
export const findByCategory = tcw(async (req, res, _next) => {
  const { category } = req.query
  const response = await ArticleService.findByCategory(category as string)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to return an article with
 * the id received as param
 */
export const findById = tcw(async (req, res, _next) => {
  const { id } = req.params
  const findByIdFn = req.headers.role ?
    ArticleService.loggedFindById
    : ArticleService.disloggedFindById
  
  const response = await findByIdFn(id)
  res.status(Http.Ok).json(response)
})