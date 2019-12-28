const cookieParser = require("cookie-parser");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const logger = require("../lib/logger");
const { allowedOrigins } = require("./configvars");
const { getUserId, attachUserToRequest } = require("../utils/customMiddleware");

function mainConfig(app) {
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        //Allow for Testing Environment Requests
        if (!origin) return callback(null, true);
        //Check Against Allowed Origins
        if (allowedOrigins.indexOf(origin) === -1) {
          let msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    })
  );
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(getUserId);
  app.use(attachUserToRequest);

  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev", { stream: logger.stream }));
  }
}

module.exports = mainConfig;
