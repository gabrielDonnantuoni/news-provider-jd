import BaseModel, { Model } from './BaseModel'

export class Author extends BaseModel {
  id!: number

  name!: string

  picture!: string

  static tableName = 'authors'

  static relationMappings = {
    articles: {
      relation: Model.HasManyRelation,
      modelClass: 'Article',
      join: {
        from: 'authors.id',
        to: 'articles.authorId',
      },
    },
  }
}