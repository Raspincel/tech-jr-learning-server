import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

export default async function verifyEmailExistanceMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as { email: string };
  
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (!user) return res.status(404)
  .json({ message: `There is no registered account associated to this e-mail. Please try using a different e-mail address.`});
  
  req.user = { ...user }
  
  next();
}