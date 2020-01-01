const jwt = require("jsonwebtoken");
const knex = require("../db/connection");
const mung = require("express-mung");
const camelize = require("camelcase-keys-deep");

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
    const user = await knex("users")
      .where({ uid: req.userId })
      .first();
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

function camelizeBody(body, req, res) {
  if (body) {
    return camelize(body);
  }
}

const camelCaseResponse = mung.json(camelizeBody);

module.exports = { getUserId, attachUserToRequest, camelCaseResponse };
