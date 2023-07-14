import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../../database'

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const token = authorization.split(' ')[1]

    if (!token) return res.status(401).json({ message: "You don't have enough credentials to do this operation. Did you forget to send your token?" })

    try {
        const { email } = jwt.verify(token, process.env.SECRET_KEY) as { email: string }
        const user = await prisma.user.findUnique({ where: { email } }) 
        req.user = { ...user }
        next()

    } catch(err) {
        return res.status(404).json({ message: "There is not user associated to the token you sent."})
    }    
}