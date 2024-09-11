import express from 'express'
import { changePassword, checkAuth, login, logout, resendOtp, resetPasswordToken, signUp, updateProfile, verifyEmail } from '../controllers/index.controller.js'
import { isVerifiedToken } from '../middlewares/isVerifiesToken.js'

const userRouter = express.Router()

userRouter.post("/sign-up", signUp)
userRouter.post("/login", login)
userRouter.post("/verify-email", verifyEmail)
userRouter.post("/reset-password", resetPasswordToken)
userRouter.post("/change-password/:token", changePassword)
userRouter.post("/update-profile", isVerifiedToken, updateProfile)

userRouter.get("/resend-otp", isVerifiedToken, resendOtp)
userRouter.get("/logout", logout)
userRouter.get("/check-auth", isVerifiedToken, checkAuth)

export { userRouter }