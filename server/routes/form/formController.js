const knex = require("../../db/connection");

async function getForms(req, res, next) {
  try {
    await console.log("Hit Forms Endpoint!");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = { getForms };
