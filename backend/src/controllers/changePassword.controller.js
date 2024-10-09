import bcrypt from 'bcrypt'

import { User } from "../models/user.model.js";
import { sendMail } from '../configs/nodeMailer.config.js';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from '../utils/emailTemplate.util.js';

async function changePassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiryAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiryAt = null;
    await user.save();

    const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
    await sendMail(user.email, "Password Reset Successful", html)

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { changePassword }