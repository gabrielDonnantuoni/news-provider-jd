import BaseModel from './BaseModel'
import ObjectionPassword from 'objection-password'

const Password = ObjectionPassword()

export class User extends Password(BaseModel) {
  id!: number

  firstName!: string

  lastName!: string

  email!: string

  password!: string

  role!: string

  static tableName = 'users'
}
