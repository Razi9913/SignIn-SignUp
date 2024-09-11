import bcrypt from 'bcrypt'

import { User } from "../models/user.model.js";

async function updateProfile(req, res) {
  const { fullName, email, password } = req.body;
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

    if (password) {
      user.password = await bcrypt.hash(password, 8);
    }
    if (email && email !== user.email) {
      user.email = email;
      user.isVerified = false;
    }

    user.fullName = fullName || user.fullName;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    })
  }
}

export { updateProfile }