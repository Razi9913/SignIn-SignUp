import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/jwt.util.js";

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    user.lastLogin = Date.now();
    await user.save();

    generateTokenAndSetCookies(user._id, res)

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { login }