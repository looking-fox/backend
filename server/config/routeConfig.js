const authenticationRoutes = require("../routes/authentication/authenticationRoutes");
const workflowRoutes = require("../routes/workflow/workflowRoutes");

function routeConfig(app) {
  app.use("/authentication", authenticationRoutes);
  app.use("/workflow", workflowRoutes);
}

module.exports = routeConfig;
