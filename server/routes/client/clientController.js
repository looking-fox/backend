const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");

async function getClients(req, res, next) {
  try {
    const { rows: clients } = await knex.raw(`
    with steps as (
    select new_row.wf_id, array_agg(row_to_json(new_row)) as wf_actions
    from (
        select actions.wf_id, wf_action_name, wf_action_type from actions
        where uid = '${req.userId}'
    ) new_row  
    group by new_row.wf_id 
    ),
    
    workflows as (select workflows.wf_id, wf_name, wf_tag_color, wf_actions from workflows
    right join steps on steps.wf_id = workflows.wf_id
    where uid = '${req.userId}'
    and archived is false
    order by workflows.updated_at desc)
        
    select client_id, client_full_name, client_email, client_phone, client_date,
    client_private_note, client_archived, clients.created_at, clients.updated_at, 
    current_wf_index, wf_name, wf_tag_color, wf_actions from clients
    right join workflows on clients.wf_id = workflows.wf_id
    where clients.uid = '${req.userId}'
    and client_archived is false;
    `);
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

    const {
      rows: [client]
    } = await knex.raw(`
    with steps as (
    select new_row.wf_id, array_agg(row_to_json(new_row)) as wf_actions
    from (
        select actions.wf_id, wf_action_name, wf_action_type from actions
        where uid = '${req.userId}'
    ) new_row  
    group by new_row.wf_id 
    ),
    
    workflows as (select workflows.wf_id, wf_name, wf_tag_color, wf_actions from workflows
    right join steps on steps.wf_id = workflows.wf_id
    where uid = '${req.userId}'
    and archived is false
    order by workflows.updated_at desc)
        
    select client_id, client_full_name, client_email, client_phone, client_date,
    client_private_note, client_archived, clients.created_at, clients.updated_at, 
    current_wf_index, wf_name, wf_tag_color, wf_actions from clients
    right join workflows on clients.wf_id = workflows.wf_id
    where clients.uid = '${req.userId}'
    and clients.client_id = ${clientId}
    and client_archived is false
    limit 1;
    `);
    return res.status(200).json({ client });
  } catch (err) {
    next(err);
  }
}

module.exports = { getClients, updateClientProgress, addClient };
