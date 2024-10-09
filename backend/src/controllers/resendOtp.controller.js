import { sendMail } from "../configs/nodeMailer.config.js";
import { User } from "../models/user.model.js";
import { VERIFICATION_CODE_TEMPLATE } from "../utils/emailTemplate.util.js";

async function resendOtp(req, res) {
  const id = req.userId;
  const attempt = 5
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      })
    }
    if (user.noOfOtpSent >= attempt) {
      user.noOfOtpSent = 0;
      user.noOfOtpSentExpiryAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
      user.save();
      return res.status(400).json({
        success: false,
        message: "Maximum otp limit reached.",
      })
    }
    if (Date.now() < new Date(user.noOfOtpSentExpiryAt).getTime()) {
      return res.status(400).json({
        success: false,
        message: `Maximum otp limit reached. try after ${new Date(user.noOfOtpSentExpiryAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          // second: "2-digit",
        })}`,
      })
    }

    // send otp logic here
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.noOfOtpSent += 1;
    user.emailOtp = otp;
    user.emailOtpExpiryAt = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const html = VERIFICATION_CODE_TEMPLATE
      .replace("{verificationCode}", otp);
    await sendMail(user.email, "Verify your E-mail", html)

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