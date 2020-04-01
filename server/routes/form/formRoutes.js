const express = require("express");
const router = express.Router();
const formController = require("./formController");

router
  .get("/", formController.getForms)
  .post("/", formController.addNewForm)
  .post("/draft", formController.addFormDraft)
  .put("/:formId", formController.updateForm)
  .delete("/:formId", formController.deleteForm);

module.exports = router;
