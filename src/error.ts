import { Request, Response, NextFunction } from "express"
import prisma from "./database"

interface LogContent {
    message: string
    id?: string
    email?: string
}

export class AppError extends Error {
    public readonly status: number
    public readonly log: LogContent

    constructor(_status: number = 400, _message: string, _log: LogContent) {
        super(_message)
        this.status = _status
        this.log = _log
    }
}

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message })

        console.log(err)
        const { message, email, id } = err.log
        const user = (id && email) ? {
            connect: {
                id: id ? id : "",
                email: email ? email : ""
            }
        } : undefined

        await prisma.log.create({
            data: {
                description: message,
                user
            }
        })

        return;
    }

    res.status(500).json({ message: "Error interno do servidor." })
}