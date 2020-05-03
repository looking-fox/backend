const express = require("express");
const router = express.Router();
const taskController = require("./taskController");

router
  .get("/", taskController.getTasks)
  .post("/task", taskController.addTask)
  .put("/task/partial/:taskId", taskController.updatePartialTask)
  .put("/task/full/:taskId", taskController.updateFullTask);

module.exports = router;
