// import ExpressParameters from '../../../utils/ExpressParameters'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../error'
import { compare } from 'bcrypt'

export default function verifyNamePasswordAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password: newPassword } = req.body
  const { password } = req.user

  const samePassword = compare(newPassword, password)

  if (samePassword) {
    throw new AppError(
      400,
      'The new password is the same as the already registered password.',
      {
        message: `Invalid password. Please try again.`,
      },
    )
  }
  next()
}
