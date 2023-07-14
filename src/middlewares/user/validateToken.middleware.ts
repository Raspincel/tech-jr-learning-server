import { Request, Response, NextFunction } from 'express'

export default function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const token = authorization.split(' ')[1]

    if (!token) return res.status(401).json({ message: "You don't have enough credentials to do this operation. Did you forget to send your token?" })

    next()
}