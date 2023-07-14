import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'
import { errorHandler } from './error'
import productRouter from './routes/product.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', userRouter)
app.use('/product', productRouter)

app.use(errorHandler)

export default app
