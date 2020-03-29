const authenticationRoutes = require("../routes/authentication/authenticationRoutes");
const workflowRoutes = require("../routes/workflow/workflowRoutes");
const clientRoutes = require("../routes/client/clientRoutes");
const formRoutes = require("../routes/form/formRoutes");

function routeConfig(app) {
  app
    .use("/authentication", authenticationRoutes)
    .use("/workflow", workflowRoutes)
    .use("/client", clientRoutes)
    .use("/form", formRoutes);
}

module.exports = routeConfig;
