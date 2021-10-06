import { tryCatchWrapper as tcw } from '../utils'
import { UserService } from '../services'
import { Http } from '@status/codes'

/**
 * Middleware that tries to login with the Request body.
 * If body matches with database, responds with { token }
 * where token is a jwt token.
 */
export const login = tcw(async (req, res, _next) => {
  const response = await UserService.login(req.body)
  res.status(Http.Ok).json(response)
})

/**
 * Middeware that tries to sing up with the Request body.
 * If body matches with database, responds with { id }
 * where id is the id of the new user created.
 */
export const singUp = tcw(async (req, res, _next) => {
  const response = await UserService.singUp(req.body)
  res.status(Http.Created).json(response)
})