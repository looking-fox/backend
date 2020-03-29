const express = require("express");
const router = express.Router();
const formController = require("./formController");

router.get("/", formController.getForms);

module.exports = router;
