const express = require("express");
const router = express.Router();
const authenticationController = require("./authenticationController");

router
  .get("/status", authenticationController.status)
  .get("/logout", authenticationController.logout)
  .post("/login", authenticationController.login)
  .post("/signup", authenticationController.signUpNewUser);

module.exports = router;
