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
    const { wf_actions } = workflow;
    delete workflow["wf_actions"];

    //--Create New Workflow--//
    const [newWfId] = await knex("workflows")
      .insert({
        ...workflow,
        uid: req.userId
      })
      .returning("wf_id");

    //--Insert Workflow Actions--//
    const snakeCaseWfActions = snakeCaseKeys(wf_actions).map(action => {
      action["wf_id"] = newWfId;
      action["uid"] = req.userId;
      return action;
    });
    await knex("actions").insert(snakeCaseWfActions);

    //--Retrieve Complete Workflow Object--//
    const newWorkflow = await getIndividualWorkflow(req.userId, newWfId);
    //--Send Back Workflow--//
    return res.status(200).json({ newWorkflow });
  } catch (err) {
    next(err);
  }
}

function deleteWorkflow(req, res, next) {
  try {
    // const { wf_id } = req.params;
    // await knex("workflows")
    //   .update({ archived: true })
    //   .where({ wf_id });
    return res.sendStatus(200);
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function getIndividualWorkflow(userId, wfId) {
  const {
    rows: [workflow]
  } = await knex.raw(`
    with all_actions as (
      select wf_id, array_agg(row_to_json(new_row)) as actions
      from (
         select wf_action_id, wf_id, wf_action_name, wf_action_type from actions
         where uid = '${userId}'
         and wf_id = '${wfId}'
      ) new_row  
      group by wf_id 
      )
      select * from workflows
      right join all_actions on workflows.wf_id = all_actions.wf_id
      limit 1;
    `);
  return workflow;
}

module.exports = { getWorkflows, addWorkflow, deleteWorkflow };
