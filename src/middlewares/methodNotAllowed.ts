import { tryCatchWrapper as tcw } from '../utils'
import { MethodNotAllowedError } from '../helpers'

const knownPaths = ['/api/login', '/api/sing-up', '/api/admin/articles',
  '/api/admin/authors', '/api/articles']

const apiArticlesIdRegex = /^\/api\/articles\/[0-9]+$/

/**
 * Verify if the req.path is known, if it is the current
 * method is not allowed then throw MethodNotAllowedError
 * otherwise skip to next middeware.
 */
export const methodNotAllowed = tcw(async (req, _res, next) => {
  if (knownPaths.includes(req.path) || apiArticlesIdRegex.test(req.path))
    throw new MethodNotAllowedError()
  next()
})
