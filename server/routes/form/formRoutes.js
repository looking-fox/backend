const express = require("express");
const router = express.Router();
const formController = require("./formController");

router
  .get("/", formController.getForms)
  .post("/new", formController.addNewForm);

module.exports = router;
