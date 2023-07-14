import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { AppError } from '../../../error';

export default async function verifyEmailAvailabilityMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as { email: string };
  
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
      where: { email }
  });

  if (user) throw new AppError(409, `This email is already registered. Please try with another email. If you think this is an error, please contact the developers`, 
  {
    message: `(${req.method}) User tried to register using the e-mail ${user.email}, but this e-mail was already registered and is owned by ${user.name}`, 
    email: user.email
  })
  
  next();
}