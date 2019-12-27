function errorConfig(app) {
  app.use(function(req, res, next) {
    const err = Error("Not Found");
    err.status = 404;
    next(err);
  });

  // Only show stack trace in development
  app.use(function(err, req, res, next) {
    // Show Errors in Development
    if (process.env.NODE_ENV === "development") {
      console.log(`🚨 Server Error [Development]: ${err}`);
    }

    res.status(err.status || 500).json({
      message: err.message,
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  });
}

module.exports = errorConfig;
