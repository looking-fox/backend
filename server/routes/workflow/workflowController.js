const knex = require("../../db/connection");

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
    const [newWorkflow] = await knex("workflows")
      .insert({
        ...req.body,
        uid: req.userId
      })
      .returning("*");
    return res.status(200).json({ newWorkflow });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWorkflows, addWorkflow };
