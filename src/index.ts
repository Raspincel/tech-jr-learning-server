import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

import loginRouter from './routes/login.routes'

app.use('/login', loginRouter);

export default app