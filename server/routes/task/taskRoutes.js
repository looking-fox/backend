const express = require("express");
const router = express.Router();
const taskController = require("./taskController");

router
  .get("/", taskController.getTasks)
  .post("/task", taskController.addTask)
  .put("/task/:taskId", taskController.updateTask);

module.exports = router;
