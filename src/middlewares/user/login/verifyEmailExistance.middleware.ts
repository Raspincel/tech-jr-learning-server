import { Request, Response, NextFunction } from 'express'
import prisma from '../../../database';
import { AppError } from '../../../error';

export default async function verifyEmailExistanceMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as { email: string };

  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (!user) throw new AppError(404, "There is no registered account associated to this e-mail. Please try using a different e-mail address.", {
    message: "User tried to log in with an email address that was not previously registered in the database",
    email
  })
  
  req.user = { ...user }
  
  next();
}