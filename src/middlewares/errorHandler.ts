import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../helpers'

export function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction): void {
  res.status(err.status).json({ message: err.message })
}