const winston = require("winston");
const { formatter, timestamp } = require("winston-console-formatter")();

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
    humanReadableUnhandledException: true,
    formatter,
    timestamp
  }
};

const logger = new winston.Logger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    logger.debug(message);
  }
};

module.exports = logger;
