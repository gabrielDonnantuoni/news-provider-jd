import BaseModel, { Model } from './BaseModel'

export class Article extends BaseModel {
  id!: number

  authorId!: number

  categoryId!: number
  
  title!: string

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
        to: 'authors.id',
      },
    },

    category: {
      relation: Model.HasOneRelation,
      modelClass: 'Category',
      join: {
        from: 'articles.categoryId',
        to: 'categories.id',
      },
    },
  }
}