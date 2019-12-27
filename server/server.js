require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "production.env" : "dev.env"
});
const express = require("express");
const app = express();

const mainConfig = require("./config/mainConfig");
const routeConfig = require("./config/routeConfig");
const errorConfig = require("./config/errorConfig");

mainConfig(app);
routeConfig(app);
errorConfig(app);

module.exports = app;
