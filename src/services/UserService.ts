import { UserModel } from '../database'
import { ILoginBody, ISingUpBody, EmailNotFoundError, WrongPasswordError,
  AlreadyExistsError, jwtOptions } from '../helpers'
import jwt from 'jsonwebtoken'

/**
 * Build data to use in jwt.sing from UserModel
 * @param user UserModel
 */
const buildDataByUser = (user: UserModel) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
})

/**
 * Try find an user with body.email, then verify password and finally
 * returns a jwt token. If some verification fails, throw proper HttpError.
 * @param body: { email, password }
 */
export async function login(body: ILoginBody): Promise<{ token: string }> {
  const validUser = await UserModel.query().findOne('email', body.email)

  if (!validUser) throw new EmailNotFoundError()

  const isValidPassword = await validUser.verifyPassword(body.password)
  if (!isValidPassword) throw new WrongPasswordError()

  const secret = process.env.JWT_SECRET as string

  const token = jwt.sign(buildDataByUser(validUser), secret, jwtOptions)

  return { token }
}

/**
 * Tries to create a new user with body param. Returns the
 * id number of the new user. If email already exists, throw
 * proper error.
 * @param body: { firstName, lastName, email, password }
 */
export async function singUp(body: ISingUpBody):
Promise<{ id: number }> {
  const newUser = await UserModel.query().insert({ ...body, role: 'client' })
    .catch(() => { throw new AlreadyExistsError('Email') })

  return { id: newUser.id }
}