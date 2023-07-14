import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

export default async function verifyEmailExistMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as { email: string };
  
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (!user) return res.status(409)
  .json({ message: `This email does not exist. Please enter an existing email address.`});
  
  next();
}