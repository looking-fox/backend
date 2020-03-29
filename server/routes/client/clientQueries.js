const knex = require("../../db/connection");

async function queryClients(userId, clientId) {
  const { rows: clients } = await knex.raw(`
      with steps as (
      select new_row.wf_id, array_agg(row_to_json(new_row)) as wf_actions
      from (
          select actions.wf_id, wf_action_name, wf_action_type from actions
          where uid = '${userId}'
      ) new_row  
      group by new_row.wf_id 
      ),
      
      workflows as (select workflows.wf_id, wf_name, wf_tag_color, wf_actions from workflows
      right join steps on steps.wf_id = workflows.wf_id
      where uid = '${userId}'
      and archived is false
      order by workflows.updated_at desc)
          
      select client_id, client_full_name, client_email, client_phone, client_date,
      client_location, client_private_note, client_archived, clients.created_at, clients.updated_at, 
      current_wf_index, wf_name, wf_tag_color, wf_actions from clients
      right join workflows on clients.wf_id = workflows.wf_id
      where clients.uid = '${userId}'
      ${clientId ? `and clients.client_id = ${clientId}` : ""}
      and client_archived is false
      order by clients.updated_at desc;
      `);
  return clients;
}

module.exports = { queryClients };
