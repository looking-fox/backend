const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");
const { queryClients } = require("./clientQueries");

async function getClients(req, res, next) {
  try {
    const clients = await queryClients(req.userId);
    return res.status(200).json({ clients });
  } catch (err) {
    next(err);
  }
}

async function updateClientProgress(req, res, next) {
  try {
    const { clientId, newIndex } = req.body;
    //Update Current Workflow Index
    await knex("clients")
      .update({ current_wf_index: newIndex })
      .where({ client_id: clientId });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function addClient(req, res, next) {
  try {
    let newClient = snakeCaseKeys(req.body);
    newClient["uid"] = req.userId;

    const [clientId] = await knex("clients")
      .insert(newClient)
      .returning("client_id");

    const [client] = await queryClients(req.userId, clientId);

    return res.status(200).json({ client });
  } catch (err) {
    next(err);
  }
}

module.exports = { getClients, updateClientProgress, addClient };
