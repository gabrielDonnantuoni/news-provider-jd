import { tryCatchWrapper as tcw } from '../utils'
import { UserService } from '../services'
import { Http } from '@status/codes'

export const login = tcw(async (req, res, _next) => {
  const response = await UserService.login(req.body)
  res.status(Http.Ok).json(response)
})