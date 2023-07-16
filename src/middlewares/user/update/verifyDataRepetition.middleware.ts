// import ExpressParameters from '../../../utils/ExpressParameters'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../error'
import { compare } from 'bcryptjs'

export default async function verifyNamePasswordAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password, name } = req.user

  const samePassword = req.body.password ? await compare(req.body.password, password) : undefined

  if (samePassword || name === req.body.name) {
    throw new AppError(
      409,
      "The new data can't be equal to the previous data. Please, try changing a field in a significant way.",
      {
        message: `(PATCH) User tried to make a patch request without really changing anything about their account`,
        email: req.user.email,
      },
    )
  }
  next()
}
