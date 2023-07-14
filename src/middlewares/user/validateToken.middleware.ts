import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../../database'

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const token = authorization.split(' ')[1]

    if (!token) return res.status(401).json({ message: "You don't have enough credentials to do this operation. Did you forget to send your token?" })

    const { email } = jwt.verify(token, process.env.SECRET_KEY) as { email: string }
    
    if (!email) return res.status(401).json({ message: "You don't have enough credentials to do this operation. Like, there is no user associated to the token you sent."})

    const user = await prisma.user.findUnique({ where: { email } }) 
    
    if (!user) return res.status(401).json({ message: "You don't have enough credentials to do this operation. Like, there is no user associated to the token you sent."})

    req.user = { ...user }
    
    next()
}