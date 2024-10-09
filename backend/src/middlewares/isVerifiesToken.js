import { getUseridFromToken } from "../utils/index.util.js";

async function isVerifiedToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthenticated - Token is not present",
    })
  }

  try {
    const userId = await getUseridFromToken(token);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthenticated",
      })
    }
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    })
  }
}

export { isVerifiedToken }