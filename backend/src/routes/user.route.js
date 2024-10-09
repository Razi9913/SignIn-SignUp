import express from 'express'
import { changePassword, checkAuth, login, logout, resendOtp, resetPasswordToken, signUp, updatePassword, updateProfile, verifyEmail } from '../controllers/index.controller.js'
import { isVerifiedToken } from '../middlewares/isVerifiesToken.js'
import { uploadMulter } from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post("/sign-up", uploadMulter.single('profileImage'), signUp)
userRouter.post("/login", login)
userRouter.post("/verify-email", verifyEmail)
userRouter.post("/reset-password", resetPasswordToken)
userRouter.post("/change-password/:token", changePassword)
userRouter.post("/update-profile", isVerifiedToken, uploadMulter.single('profileImage'), updateProfile)
userRouter.post("/update-password", isVerifiedToken, updatePassword)

userRouter.get("/logout", logout)
userRouter.get("/resend-otp", isVerifiedToken, resendOtp)
userRouter.get("/check-auth", isVerifiedToken, checkAuth)

export { userRouter }