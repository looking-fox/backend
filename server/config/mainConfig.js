const cookieParser = require("cookie-parser");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const logger = require("../lib/logger");

function mainConfig(app) {
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev", { stream: logger.stream }));
  }
}

module.exports = mainConfig;
