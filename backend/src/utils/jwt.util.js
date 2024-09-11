import jwt from 'jsonwebtoken'

function generateTokenAndSetCookies(userId, res) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(
    { userId },
    JWT_SECRET_KEY,
    { expiresIn: '7d', }
  )

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,//
  })

  return token;
}

function getUseridFromToken(token) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  const decodedToken = jwt.verify(token, JWT_SECRET_KEY)

  return decodedToken.userId
}

export { generateTokenAndSetCookies, getUseridFromToken }