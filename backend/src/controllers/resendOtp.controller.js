import { User } from "../models/user.model.js";
import { sendOtp } from "../utils/sendOtp.util.js";

async function resendOtp(req, res) {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      })
    }
    // send otp logic here
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.emailOtp = otp;
    user.emailOtpExpiryAt = Date.now() + 30 * 60 * 1000;
    await user.save();

    await sendOtp(user.email, otp)

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully.",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error resending otp.",
    })
  }
}

export { resendOtp }