import { Router, Request, Response } from 'express'

const loginRouter = Router()

loginRouter.get('', (req: Request, res: Response)=> {
    res.status(200).json({ message: "YOooooooo "})
})

export default loginRouter