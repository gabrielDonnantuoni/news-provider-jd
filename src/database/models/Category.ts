import BaseModel from './BaseModel'

export default class Category extends BaseModel {
  id!: number

  name!: string

  static tableName = 'categories'
}