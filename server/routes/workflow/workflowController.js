const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");

async function getWorkflows(req, res, next) {
  try {
    const { rows: workflows } = await knex.raw(`
    with all_actions as (
      select wf_id, array_agg(row_to_json(new_row)) as actions
      from (
         select wf_action_id, wf_id, wf_action_name, wf_action_type from actions
         where uid = '${req.userId}'
      ) new_row  
      group by wf_id 
      )
      select * from workflows
      right join all_actions on workflows.wf_id = all_actions.wf_id;
    `);
    return res.status(200).json({ workflows });
  } catch (err) {
    next(err);
  }
}

async function addWorkflow(req, res, next) {
  try {
    const workflow = snakeCaseKeys(req.body);
    const [newWorkflow] = await knex("workflows")
      .insert({
        ...workflow,
        uid: req.userId
      })
      .returning("*");
    return res.status(200).json({ newWorkflow });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWorkflows, addWorkflow };
