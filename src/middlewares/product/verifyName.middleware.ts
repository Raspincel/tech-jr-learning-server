import { AppError } from '../../error'
import { Request, Response, NextFunction } from 'express'

export function verifyNameMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.params

  if (!name) {
    throw new AppError(
      400,
      'Name is necessary in the params of your requisition.',
      {
        message: `(${req.method}) User didn't send a name when trying to access ${req.url}`,
        email: req.user.email,
      },
    )
  }

  next()
}
