const express = require("express");
const router = express.Router();
const clientController = require("./clientController");

router
  .get("/", clientController.getClients)
  .put("/progress", clientController.updateClientProgress)
  .post("/new", clientController.addClient);

module.exports = router;
