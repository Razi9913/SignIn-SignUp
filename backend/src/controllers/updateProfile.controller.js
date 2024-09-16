import { User } from "../models/user.model.js";
import { sendOtp } from "../utils/sendOtp.util.js";

async function updateProfile(req, res) {
  const { fullName, email } = req.body;
  const id = req.userId;

  try {
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        })
      }
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    if (email && email !== user.email) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await sendOtp(email, otp)
      user.email = email;
      user.emailOtp = otp;
      user.emailOtpExpiryAt = Date.now() + 30 * 60 * 1000;
      user.isVerified = false;
    }

    if (req.file) {
      user.profileImage = `http://localhost:3000/images/${req.file.filename}`;
    }

    user.fullName = fullName || user.fullName;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    })
  }
}

export { updateProfile }