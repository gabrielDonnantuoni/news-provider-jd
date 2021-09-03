import { UserModel } from '../database'
import { ILoginBody, EmailNotFoundError, WrongPasswordError, jwtOptions } from '../helpers'
import jwt from 'jsonwebtoken'

const buildDataByUser = (user: UserModel) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
})

export async function login(body: ILoginBody): Promise<{ token: string }> {
  const validUser = await UserModel.query().findOne('email', body.email)

  if (!validUser) throw new EmailNotFoundError()

  const isValidPassword = await validUser.verifyPassword(body.password)
  if (!isValidPassword) throw new WrongPasswordError()

  const secret = process.env.JWT_SECRET as string

  const token = jwt.sign(buildDataByUser(validUser), secret, jwtOptions)

  return { token }
}