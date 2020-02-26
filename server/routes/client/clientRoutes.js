const express = require("express");
const router = express.Router();
const clientController = require("./clientController");

router.get("/", clientController.getClients);
router.put("/progress", clientController.updateClientProgress);

module.exports = router;
