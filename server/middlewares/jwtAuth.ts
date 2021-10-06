import jwt from 'jsonwebtoken'
import { jwtOptions, TokenNotFoundError, ExpiredOrInvalidTokenError } from '../helpers'
import { tryCatchWrapper as tcw } from '../utils'
import { UserService } from '../services'
import { Http } from '@status/codes'


/**
 * From a type of authentication, returns a middleware that
 * validates an header authentication token and tries to add
 * role type of user to req.body. Nonetheless if type is 'required'
 * any validation fail throws an HttpError, otherwise leave req.body.role
 * as undefined.
 * @param type 
 */
export function jwtAuth(type: 'required' | 'privilege'):
ReturnType<typeof tcw> {
  const isRequired = type === 'required'

  return tcw(async (req, _res, next) => {
    const token = req.headers.authorization
    if (!token && isRequired) throw new TokenNotFoundError()

    if (token) {
      const secret = process.env.JWT_SECRET as string
      
      let payload = undefined
      try {
        payload = jwt.verify(token, secret, jwtOptions) as jwt.JwtPayload
      } catch (err: any) {
        if (isRequired) {
          if (err.message.startsWith('invalid signature')) throw err
          throw new ExpiredOrInvalidTokenError()
        }
      }

      if (payload) {
        const isValid = await UserService.isValidUser(payload.data)
        if (!isValid && isRequired) throw new ExpiredOrInvalidTokenError()
        if (isValid) {
          req.headers = { ...req.headers, role: payload.data.role }
        }
      }
    }
    next()
  }, Http.Unauthorized)
}