import { Request, Response, NextFunction } from 'express'

export default interface ExpressParameters {
  req: Request
  res: Response
  next: NextFunction
}
