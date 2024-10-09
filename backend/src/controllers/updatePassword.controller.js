import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js';

async function updatePassword(req, res) {
  const { password } = req.body;
  const id = req.userId;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new password cannot be same. Please try a different Password",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    user.password = hashPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    })
  }
}

export { updatePassword }