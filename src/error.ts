import { NextFunction, Request, Response } from 'express'
import prisma from './database'
import { ValidationError } from 'yup'
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

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message })

    const { message, email } = err.log
    const user = email || undefined

    await prisma.log.create({
      data: {
        description: message,
        user,
      },
    })

    return
  }

  if (err.name === "SyntaxError") {
    res.status(400).json({ message: "Please send a proper JSON object" })
    return;
  }

  console.log(err)

  res.status(500).json({ message: 'Error interno do servidor.' })
}
