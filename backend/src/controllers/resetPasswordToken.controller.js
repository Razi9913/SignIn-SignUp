import crypto from 'crypto'

import { User } from "../models/user.model.js";
import { sendMail } from '../configs/nodeMailer.config.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from '../utils/emailTemplate.util.js';

async function resetPasswordToken(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiryAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save()

    const html = PASSWORD_RESET_REQUEST_TEMPLATE
      .replace("{resetUrl}", `${process.env.FRONTEND_URL}/change-password/${resetToken}`)
    await sendMail(user.email, "Reset password link", html)

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { resetPasswordToken }