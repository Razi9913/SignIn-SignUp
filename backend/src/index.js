import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import { userRouter } from './routes/user.route.js'

dotenv.config()
const app = express()

const __dirname = path.resolve()

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }))

app.use(express.static('backend/public'))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRouter)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

export { app }