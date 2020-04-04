const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");
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

async function addFormDraft(req, res, next) {
  try {
    const { body: newForm } = req;
    const { formFields: newFormFields } = newForm;
    const previousFormId = newForm.formId;

    delete newForm["formFields"];
    newForm["formDraftOf"] = newForm.formId;
    newForm["formLink"] = await generateId();
    delete newForm["formId"];

    const [formId] = await knex("forms")
      .insert(snakeCaseKeys(newForm))
      .returning("form_id");

    const newFormFieldsWithId = newFormFields.map((field) => {
      field["formId"] = formId;
      delete field["createdAt"];
      delete field["updatedAt"];
      delete field["formFieldId"];
      return field;
    });

    await knex("form_fields").insert(snakeCaseKeys(newFormFieldsWithId));
    const [updatedForm] = await queryForms(req.userId, formId);

    return res.status(200).json({ updatedForm, previousFormId });
  } catch (err) {
    next(err);
  }
}

async function updateFormDraft(req, res, next) {
  try {
    let { body: updatedForm } = req;
    const { formFields } = updatedForm;
    delete updatedForm["formFields"];
    const formId = +req.params.formId;
    // Delete existing form and add new form
    await knex("forms").where({ form_id: formId }).del();
    await knex("forms").insert(snakeCaseKeys(updatedForm));
    // Format form fields and insert into table
    const formattedFormFields = formFields.map((field) => {
      delete field["form_field_id"];
      return field;
    });
    await knex("form_fields").insert(snakeCaseKeys(formattedFormFields));
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

module.exports = {
  getForms,
  addNewForm,
  addFormDraft,
  updateFormDraft,
  updateForm,
  deleteForm,
};
