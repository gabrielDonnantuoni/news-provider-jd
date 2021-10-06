import { ArticleService } from '../services'
import { tryCatchWrapper as tcw } from '../utils'
import { Http } from '@status/codes'

/**
 * Middeware that tries to create an article with the Request body.
 * If body matches with database, responds with { id }
 * where id is the id of the new user article.
 */
export const create = tcw(async (req, res, _next) => {
  const response = await ArticleService.create(req.body)
  res.status(Http.Created).json(response)
})

/**
 * Middeware that tries to get all articles.
 */
export const getAll = tcw(async (_req, res, _next) => {
  const response = await ArticleService.getAll()
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an article by id.
 */
export const defaultFindById = tcw(async (req, res, _next) => {
  const response = await ArticleService.defaultFindById(req.params.id)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an article by id.
 */
export const updateById = tcw(async (req, res, _next) => {
  const response = await ArticleService.updateById(req.params.id, req.body)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an article by id.
 */
export const deleteById = tcw(async (req, res, _next) => {
  const response = await ArticleService.deleteById(req.params.id)
  res.status(Http.Ok).json(response)
})

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