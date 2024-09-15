import { User } from "../models/user.model.js";
import { getUseridFromToken, sendWelcomeEmail } from "../utils/index.util.js";

async function verifyEmail(req, res) {
  const { emailOtp } = req.body;
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found.",
      })
    }
    const userId = getUseridFromToken(token)
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Token not valid.",
      })
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      })
    }
    // console.log(typeof (emailOtp.toString()), typeof (user.emailOtp.toString()));
    // console.log(Date.now() < new Date(user.emailOtpExpiryAt).getTime());

    if (emailOtp.toString() !== user.emailOtp.toString() || Date.now() > new Date(user.emailOtpExpiryAt).getTime()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Or Expiry Otp.",
      })
    }

    user.isVerified = true;
    user.emailOtp = undefined;
    user.emailOtpExpiryAt = undefined;
    user.noOfOtpSent = undefined;
    user.noOfOtpSentExpiryAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export {
  verifyEmail,
}