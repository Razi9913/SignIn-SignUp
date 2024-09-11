import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies, sendOtp } from "../utils/index.util.js";

async function signUp(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already Existd",
      })
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const user = new User({
      fullName,
      email,
      password: passwordHash,
      emailOtp: otp,
      emailOtpExpiryAt: Date.now() + 30 * 60 * 1000,
      lastLogin: Date.now(),
    });
    await user.save()

    generateTokenAndSetCookies(user._id, res)

    await sendOtp(user.email, otp, user.fullName)

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { signUp }