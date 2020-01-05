const express = require("express");
const router = express.Router();
const workflowController = require("./workflowController");

router
  .get("/", workflowController.getWorkflows)
  .post("/new", workflowController.addWorkflow);

module.exports = router;
