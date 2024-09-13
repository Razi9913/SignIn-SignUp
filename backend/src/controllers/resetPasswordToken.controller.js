import crypto from 'crypto'

import { User } from "../models/user.model.js";
import { sendResetPasswordLink } from '../utils/index.util.js';

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
    user.resetPasswordTokenExpiryAt = Date.now() + 15 * 60 * 1000;;
    await user.save()

    await sendResetPasswordLink(user.email, resetToken);

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