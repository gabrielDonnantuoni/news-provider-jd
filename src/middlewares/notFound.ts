import { tryCatchWrapper as tcw } from '../utils'
import { NotFoundError } from '../helpers'

/**
 * If the request arrived in this middleware, the path 
 * is not implemented, then it throws a NotFoundError().
 * Should be place just before error handler middleware.
 */
export const notFound = tcw(async (_req, _res, _next) => {
  throw new NotFoundError()
})