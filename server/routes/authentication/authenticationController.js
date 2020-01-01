const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../../config/configvars");
const knex = require("../../db/connection");

async function status(req, res, next) {
  res.status(200).json({ isAuthenticated: req.userId !== undefined });
}

async function login(req, res, next) {
  try {
    const { uid } = req.body;
    const token = createJwt(uid);
    res.cookie("token", token, cookieOptions);
    // Look up user
    const loggedInUser = await knex("users")
      .where({ uid })
      .first();
    // Send back user
    res.status(200).json({ user: loggedInUser });
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

async function signUp(req, res, next) {
  try {
    const { uid, displayName, photoURL, email } = req.body.user;
    // Create New User
    const [newUser] = await knex("users")
      .insert({
        uid,
        email,
        display_name: displayName,
        profile_photo_url: photoURL
      })
      .returning(["uid", "email", "display_name", "profile_photo_url"]);
    // Token
    const token = createJwt(uid);
    res.cookie("token", token, cookieOptions);
    // Send Back Usere
    res.status(200).json({ user: newUser });
  } catch (err) {
    next(err);
  }
}

function createJwt(userId) {
  return jwt.sign({ userId }, process.env.APP_SECRET);
}

module.exports = {
  status,
  login,
  logout,
  signUp
};
