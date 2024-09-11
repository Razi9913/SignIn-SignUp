import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { userRouter } from './routes/user.route.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRouter)

export { app }