import { sendMail } from "../configs/nodeMailer.config.js";
import { User } from "../models/user.model.js";
import { deleteFile } from "../utils/delete.util.js";
import { VERIFICATION_CODE_TEMPLATE } from "../utils/emailTemplate.util.js";

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
        });
      }
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    let oldProfileImage = "";
    if (user.profileImage) {
      oldProfileImage = user.profileImage;
    }

    if (email && email !== user.email) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.email = email;
      user.emailOtp = otp;
      user.emailOtpExpiryAt = Date.now() + 15 * 60 * 1000; // 15 min
      user.isVerified = false;

      const html = VERIFICATION_CODE_TEMPLATE
        .replace("{verificationCode}", otp);
      await sendMail(user.email, "Verify your E-mail", html);
    }

    if (req.file) {
      user.profileImage = `/images/${req.file.filename}`;
      await user.save();
      if (oldProfileImage) {
        deleteFile(oldProfileImage)
      }
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
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    });
  }
}

export { updateProfile };