// import ExpressParameters from '../../../utils/ExpressParameters'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../error'
import { compare } from 'bcryptjs'

export default async function verifyDataRepetit(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password: newPassword } = req.body
  const { password } = req.user

  const samePassword = await compare(newPassword, password)

  console.log(samePassword)

  if (samePassword) {
    throw new AppError(
      409,
      'The new password is the same as the already registered one.',
      {
        message: `Invalid password. Please try again.`,
      },
    )
  }
  next()
}
