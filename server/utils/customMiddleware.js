const jwt = require("jsonwebtoken");

function getUserId(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
}

async function attachUserToRequest(req, res, next) {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  try {
    req.user = { displayName: "Mocker Man", email: "mock@mockmail.io" };
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { getUserId, attachUserToRequest };
