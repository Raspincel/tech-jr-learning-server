import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

export default async function verifyPasswordMiddleware(req: Request, res: Response, next: NextFunction){
  const { email, password } = req.body as { email: string, password: string };

  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { email }
  });

  const isCorrectPassword = compare(password, user.password);

  if (!isCorrectPassword) return res.status(409).json({message: "Incorrect password. Please try again."});

  next();
}

