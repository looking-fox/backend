const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../../config/configvars");

async function status(req, res, next) {
  res.status(200).json({ isAuthenticated: req.userId !== undefined });
}

async function login(req, res, next) {
  try {
    const token = createJwt(234234);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      user: { displayName: "Mock User", email: "mock@gmail.com" }
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res, next) {
  res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json({
      message: "Logged Out"
    });
}

function createJwt(userId) {
  return jwt.sign({ userId }, process.env.APP_SECRET);
}

module.exports = {
  status,
  login,
  logout
};
