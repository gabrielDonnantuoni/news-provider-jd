import { Request, Response, NextFunction } from 'express'
import { IExpressMiddleware, HttpError } from '../helpers'
import { Http } from '@status/codes'

export function tryCatchWrapper(callback: IExpressMiddleware, status = Http.InternalServerError) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await callback(req, res, next)
    } catch (err: any) {
      if (err.status) next(err)
      else next(new HttpError(status, err.message))
    }
  }
}