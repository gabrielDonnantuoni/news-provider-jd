import { Request, Response, NextFunction } from 'express'

export type IExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void | Response | NextFunction>

export enum IAuthType {
  Needed = 'Needed',
  Privilege = 'Privilege',
}

export interface ILoginBody {
  email: string
  password: string
}

export interface IConnection {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
}
