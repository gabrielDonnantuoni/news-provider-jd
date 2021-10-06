import { tryCatchWrapper as tcw } from '../utils'
import { InvalidRoleError } from '../helpers'

/**
 * Verify with user has required role. If true, pass
 * to next middleware, otherwise throw InvalidRoleError 
 * to error handler middleware.
 * @param role 'admin' | 'client'
 */
export function hasRole(role: 'admin' | 'client'):
ReturnType<typeof tcw> {
  return tcw(async (req, _res, next) => {
    const isValidRole = req.headers.role === role
    if (!isValidRole) next(new InvalidRoleError())
    next()
  })
}