const knex = require("../../db/connection");
const { generateId } = require("../../utils/utils");
const { queryForms } = require("./formQueries");

async function getForms(req, res, next) {
  try {
    const forms = await queryForms(req.userId);
    return res.status(200).json({ forms });
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

async function updateForm(req, res, next) {
  try {
    await console.log("Hit UPDATE Endpoint!");
    console.log("BODY: ", req.body);
    console.log("PARAMS: ", req.params);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function deleteForm(req, res, next) {
  try {
    await console.log("Hit DELETE Endpoint!");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = { getForms, addNewForm, updateForm, deleteForm };
