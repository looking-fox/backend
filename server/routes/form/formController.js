const knex = require("../../db/connection");
const { generateId } = require("../../utils/utils");

async function getForms(req, res, next) {
  try {
    await console.log("Hit endpoint!");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function addNewForm(req, res, next) {
  try {
    const newFormId = await generateId();
    console.log("New Form ID: ", newFormId);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = { getForms, addNewForm };
