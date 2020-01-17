const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");

async function getClients(req, res, next) {
  try {
    const { rows: clients } = await knex.raw(`
    select client_id, client_full_name, client_email, client_phone, client_date,
    client_private_note, client_archived, clients.created_at, clients.updated_at, 
    wf_name, wf_tag_color
    from clients
    left join workflows on workflows.wf_id = clients.wf_id
    where clients.uid = '${req.userId}'
    and client_archived is false;
    `);
    return res.status(200).json({ clients });
  } catch (err) {
    next(err);
  }
}

module.exports = { getClients };
