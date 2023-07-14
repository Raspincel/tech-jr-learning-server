import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', userRouter)

export default app
