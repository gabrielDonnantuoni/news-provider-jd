import { tryCatchWrapper as tcw } from '../utils'
import { AuthorService } from '../services'
import { Http } from '@status/codes'

/**
 * Middeware that tries to create an author with the Request body.
 * If body matches with database, responds with { id }
 * where id is the id of the new user author.
 */
export const create = tcw(async (req, res, _next) => {
  const response = await AuthorService.create(req.body)
  res.status(Http.Created).json(response)
})

/**
 * Middeware that tries to get all authors.
 */
export const getAll = tcw(async (_req, res, _next) => {
  const response = await AuthorService.getAll()
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an author by id.
 */
export const findById = tcw(async (req, res, _next) => {
  const response = await AuthorService.findById(req.params.id)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an author by id.
 */
export const updateById = tcw(async (req, res, _next) => {
  const response = await AuthorService.updateById(req.params.id, req.body)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to find an author by id.
 */
export const deleteById = tcw(async (req, res, _next) => {
  const response = await AuthorService.deleteById(req.params.id)
  res.status(Http.Ok).json(response)
})