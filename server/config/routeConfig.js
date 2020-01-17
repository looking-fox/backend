const authenticationRoutes = require("../routes/authentication/authenticationRoutes");
const workflowRoutes = require("../routes/workflow/workflowRoutes");
const clientRoutes = require("../routes/client/clientRoutes");

function routeConfig(app) {
  app.use("/authentication", authenticationRoutes);
  app.use("/workflow", workflowRoutes);
  app.use("/client", clientRoutes);
}

module.exports = routeConfig;
