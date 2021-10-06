import Joi from 'joi'

export const create = Joi.object({
  name: Joi.string().required(),
  picture: Joi.string().uri().required(),
})

export const update = Joi.object({
  picture: Joi.string().uri().required(),
})