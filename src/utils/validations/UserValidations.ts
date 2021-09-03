import Joi from 'joi'

const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export const singUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(strongPassword).required(),
})