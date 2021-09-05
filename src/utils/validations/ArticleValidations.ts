import Joi from 'joi'

export const create = Joi.object({
  authorId: Joi.number().required(),
  categoryId: Joi.number().required(),
  title: Joi.string().required(),
  summary: Joi.string().required(),
  firstParagraph: Joi.string().required(),
  body: Joi.string().required(),
})

export const update = Joi.object({
  categoryId: Joi.number(),
  title: Joi.string(),
  summary: Joi.string(),
  firstParagraph: Joi.string(),
  body: Joi.string(),
})