import BaseModel from './BaseModel'
import ObjectionPassword from 'objection-password'

const Password = ObjectionPassword()

@Password
export default class User extends BaseModel {
  firstName!: string

  lastName!: string

  email!: string

  password!: string

  role!: string

  static tableName = 'users'
}