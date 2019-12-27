const authenticationRoutes = require("../routes/authentication/authenticationRoutes");

function routeConfig(app) {
  app.use("/authentication", authenticationRoutes);
}

module.exports = routeConfig;
