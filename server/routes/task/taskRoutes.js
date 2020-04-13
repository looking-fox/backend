const express = require("express");
const router = express.Router();
const taskController = require("./taskController");

router.get("/", taskController.getTasks);

module.exports = router;
