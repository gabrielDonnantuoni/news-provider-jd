import { Validations, tryCatchWrapper as tcw } from '../utils'
import { ObjectSchema } from 'joi'
import { Http } from '@status/codes'

const options = { errors: { wrap: { label: "'" } } }

/**
 * Get proper Validation middleware from choosed entity and resource
 * of Validations joi schemas in utils/validations
 * @param entity Valid entity
 * @param resource Valid resource of entity
 * 
 * @example
 * validate('User', 'login') => ExpressMiddleware
 */
export function validate
<E extends keyof (typeof Validations), R extends keyof (typeof Validations[E])>(
  entity: E, resource: R,
): ReturnType<typeof tcw> {
  return tcw(async (req, _res, next) => {
    const schema = Validations[entity][resource] as unknown as ObjectSchema<any>
    await schema.validateAsync(req.body, options)
    next()
  }, Http.BadRequest)
}
