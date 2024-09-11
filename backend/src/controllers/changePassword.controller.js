import bcrypt from 'bcrypt'

import { User } from "../models/user.model.js";
import { sendPasswordChangedMail } from '../utils/sendPasswordChangedMail.util.js';

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

    await sendPasswordChangedMail(user.email)

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