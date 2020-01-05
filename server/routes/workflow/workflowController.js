const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");

async function getWorkflows(req, res, next) {
  try {
    const workflows = await knex("workflows").where({ uid: req.userId });
    return res.status(200).json({ workflows });
  } catch (err) {
    next(err);
  }
}

async function addWorkflow(req, res, next) {
  try {
    const workflow = snakeCaseKeys(req.body);
    const [newWorkflow] = await knex("workflows")
      .insert({
        ...workflow,
        uid: req.userId
      })
      .returning("*");
    return res.status(200).json({ newWorkflow });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWorkflows, addWorkflow };
