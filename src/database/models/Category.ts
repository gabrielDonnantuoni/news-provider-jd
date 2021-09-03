import BaseModel from './BaseModel'

export class Category extends BaseModel {
  id!: number

  name!: string

  static tableName = 'categories'
}