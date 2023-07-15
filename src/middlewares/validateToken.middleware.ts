import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../database'
import { AppError } from '../error'

export default async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers

  const token = authorization ? authorization.split(' ')[1] : undefined

  if (!token)
    throw new AppError(
      401,
      "You don't have enough credentials to do this operation. Did you forget to send your token?",
      {
        message: `(${req.method}) User didn't send a token when trying to access ${req.url}`,
      },
    )

  try {
    const { email } = jwt.verify(token, process.env.SECRET_KEY) as {
      email: string
    }
    req.body.email = email

    const user = await prisma.user.findUnique({ where: { email } })
    req.user = { ...user }
    next()
  } catch (err) {
    throw new AppError(
      404,
      'There is no user associated to the token you sent.',
      {
        message: `(${req.method}) User either sent an invalid token when trying to access ${req.url}, or sent a token containing an email that is not registered in the database`,
        email: req.body.email ? req.body.email : undefined,
      },
    )
  }
}
