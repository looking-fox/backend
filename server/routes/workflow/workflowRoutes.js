const express = require("express");
const router = express.Router();
const workflowController = require("./workflowController");

router
  .get("/", workflowController.getWorkflows)
  .post("/new", workflowController.addWorkflow)
  .put("/update", workflowController.updateWorkflow)
  .put("/archive/:wf_id", workflowController.archiveWorkflow);

module.exports = router;
