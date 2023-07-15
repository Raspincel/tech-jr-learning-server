import { Request, Response, NextFunction } from 'express'
import prisma from '../../database'
import { AppError } from '../../error'

export default async function verifyExistenceRegisterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.user
  const { name } = req.body

  const user = await prisma.product.findUnique({
    where: {
      name,
      AND: {
        user: email,
      },
    },
  })

  if (user)
    throw new AppError(
      409,
      'You have already registered this product. Please try with another name',
      {
        message: `(${req.method}) User tried to register a product that is already associated to their e-mail address`,
        email: req.user.email,
      },
    )

  next()
}
