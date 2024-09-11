async function logout(req, res) {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({
        success: false,
        message: "User is not logged in."
      })
    }
    res.clearCookie('token');

    return res.status(200).json({
      success: true,
      message: "Logged out successfully."
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    })
  }
}

export { logout }