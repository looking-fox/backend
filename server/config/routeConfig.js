const authenticationRoutes = require("../routes/authentication/authenticationRoutes");
const workflowRoutes = require("../routes/workflow/workflowRoutes");
const clientRoutes = require("../routes/client/clientRoutes");
const formRoutes = require("../routes/form/formRoutes");
const taskRoutes = require("../routes/task/taskRoutes");

function routeConfig(app) {
  app
    .use("/authentication", authenticationRoutes)
    .use("/workflows", workflowRoutes)
    .use("/clients", clientRoutes)
    .use("/forms", formRoutes)
    .use("/tasks", taskRoutes);
}

module.exports = routeConfig;
