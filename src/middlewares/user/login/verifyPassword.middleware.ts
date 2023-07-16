import { Request, Response, NextFunction } from 'express'
import { compare } from 'bcryptjs'
import { AppError } from '../../../error'

export default async function verifyPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body as { email: string; password: string }

  const isCorrectPassword = await compare(password, req.user.password)

  if (!isCorrectPassword)
    throw new AppError(409, 'Incorrect password. Please try again.', {
      message: `(${req.method}) User sent the wrong password when trying to log in`,
      email,
    })

  next()
}
