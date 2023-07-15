// import ExpressParameters from '../../../utils/ExpressParameters'
import emailValidator from 'deep-email-validator'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../error'
import { PrismaClient } from '@prisma/client'

export default async function verifyEmailIntegrity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body as { email: string }

  if (email) {
    const prisma = new PrismaClient()

    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (user)
      throw new AppError(
        409,
        `This email is already registered. Please try with another email. If you think this is an error, please contact the developers`,
        {
          message: `(${req.method}) User tried to register using the e-mail ${user.email}, but this e-mail was already registered and is owned by ${user.name}`,
          email: user.email,
        },
      )

    const isValidEmail = email.endsWith('@acad.ifma.edu.br')

    if (!isValidEmail)
      throw new AppError(
        401,
        'You must use your academic email to register :(',
        {
          message:
            'User tried to register with an email that does not belong to the IFMA domain (does not end with @acad.ifma.edu.br)',
          email,
        },
      )

    const { valid } = await emailValidator(email)

    if (!valid)
      throw new AppError(401, 'Insert a valid email', {
        message: `(${req.method}) User tried to register with a false email. It is necessary to use a real email in this application`,
        email,
      })
  }

  next()
}
