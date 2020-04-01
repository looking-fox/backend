const authenticationRoutes = require("../routes/authentication/authenticationRoutes");
const workflowRoutes = require("../routes/workflow/workflowRoutes");
const clientRoutes = require("../routes/client/clientRoutes");
const formRoutes = require("../routes/form/formRoutes");

function routeConfig(app) {
  app
    .use("/authentication", authenticationRoutes)
    .use("/workflows", workflowRoutes)
    .use("/clients", clientRoutes)
    .use("/forms", formRoutes);
}

module.exports = routeConfig;
