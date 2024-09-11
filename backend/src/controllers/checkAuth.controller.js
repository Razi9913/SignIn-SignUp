import { User } from "../models/user.model.js"

const checkAuth = async (req, res) => {
  const user = await User.findById(req.userId)
  try {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { checkAuth }