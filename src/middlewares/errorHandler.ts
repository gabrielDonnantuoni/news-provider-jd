import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../helpers'

/**
 * Middleware that handles errors passed through NextFunction(error)
 * 
 * @param {HttpError} err Received error
 * @param {Request} _req just used as positional param
 * @param {Response} res Response 
 * @param {NextFunction} _next just used as positional param 
 */
export function errorHandler(
  err: HttpError, _req: Request, res: Response, _next: NextFunction,
): void {
  res.status(err.status).json({ message: err.message })
}