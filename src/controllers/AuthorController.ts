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