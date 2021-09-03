import BaseModel, { Model } from './BaseModel'

export class Article extends BaseModel {
  id!: number

  authorId!: number

  title!: string

  category!: string

  summary!: string

  firstParagraph!: string

  body!: string

  static tableName = 'articles'

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Author',
      join: {
        from: 'articles.authorId',
        to: 'author.id',
      },
    },
  }
}