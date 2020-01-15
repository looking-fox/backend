const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");

async function getWorkflows(req, res, next) {
  try {
    const { rows: workflows } = await knex.raw(`
    with all_actions as (
      select wf_id, array_agg(row_to_json(new_row)) as wf_actions
      from (
         select wf_id, wf_action_name, wf_action_type from actions
         where uid = '${req.userId}'
      ) new_row  
      group by wf_id 
      )
      select * from workflows
      right join all_actions on workflows.wf_id = all_actions.wf_id
      where uid = '${req.userId}'
      and archived is false
      order by workflows.updated_at desc;
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
    console.log("Workflow: ", workflow);
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

async function updateWorkflow(req, res, next) {
  try {
    const { wf_id, wf_name, wf_tag_color, wf_actions } = snakeCaseKeys(
      req.body
    );
    //Update Workflow
    await knex("workflows")
      .update({ wf_name, wf_tag_color })
      .where({ wf_id });
    //Remove Previous Actions
    await knex("actions")
      .where({ wf_id })
      .del();
    //Insert New Actions
    const actionsWithId = wf_actions.map(action => {
      action["wf_id"] = wf_id;
      action["uid"] = req.userId;
      return action;
    });
    await knex("actions").insert(actionsWithId);
    //Send Back Status
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function archiveWorkflow(req, res, next) {
  try {
    const { wf_id } = req.params;
    await knex("workflows")
      .update({ archived: true })
      .where({ wf_id });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function getIndividualWorkflow(userId, wfId) {
  const {
    rows: [workflow]
  } = await knex.raw(`
    with all_actions as (
      select wf_id, array_agg(row_to_json(new_row)) as wf_actions
      from (
         select wf_id, wf_action_name, wf_action_type from actions
         where uid = '${userId}'
         and wf_id = '${wfId}'
      ) new_row  
      group by wf_id 
      )
      select * from workflows
      right join all_actions on workflows.wf_id = all_actions.wf_id
      where uid = '${userId}'
      and archived is false
      limit 1;
    `);
  return workflow;
}

module.exports = { getWorkflows, addWorkflow, updateWorkflow, archiveWorkflow };
