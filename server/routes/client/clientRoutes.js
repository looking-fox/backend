const express = require("express");
const router = express.Router();
const clientController = require("./clientController");

router.get("/", clientController.getClients);

module.exports = router;
