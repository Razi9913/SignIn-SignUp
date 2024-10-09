import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/index.util.js";
import { sendMail } from "../configs/nodeMailer.config.js";
import { VERIFICATION_CODE_TEMPLATE } from "../utils/emailTemplate.util.js";

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
      emailOtpExpiryAt: Date.now() + 15 * 60 * 1000, // 30 min
      profileImage: req.file ? `/images/${req.file.filename}` : "",
      lastLogin: Date.now(),
    });

    generateTokenAndSetCookies(user._id, res)

    const html = VERIFICATION_CODE_TEMPLATE
      .replace("{verificationCode}", otp);
    await sendMail(user.email, "Verify your E-mail", html)

    await user.save()

    res.status(201).json({
      success: true,
      message: "Account Created And Otp Send Successfully",
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