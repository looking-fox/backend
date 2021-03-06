const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");
const { queryTasks } = require("./taskQueries");
const { batchUpdate } = require("../../utils/utils");

async function getTasks(req, res, next) {
  try {
    const taskColumns = await queryTasks(req.userId);
    res.status(200).json({ taskColumns });
  } catch (err) {
    next(err);
  }
}

async function addTask(req, res, next) {
  try {
    const { location } = req.body;
    let [newTask] = await knex("tasks")
      .insert({ uid: req.userId, ...snakeCaseKeys(location) })
      .returning("*");
    newTask.isNew = true;
    res.status(200).json({ newTask });
  } catch (err) {
    next(err);
  }
}

async function updatePartialTask(req, res, next) {
  try {
    const { task } = req.body;
    const taskId = +req.params.taskId;
    // update task
    const [updatedTask] = await knex("tasks")
      .update(snakeCaseKeys(task))
      .where({ task_id: taskId })
      .returning("*");
    // attach task actions array
    const taskActions = await knex("task_actions").where({ task_id: taskId });
    updatedTask.taskActions = taskActions;
    // send back results
    res.status(200).json({ updatedTask, taskId });
  } catch (err) {
    next(err);
  }
}

async function updateFullTask(req, res, next) {
  try {
    const { task } = req.body;
    const taskId = +req.params.taskId;
    const { taskActions, clientFullName } = task || {};
    // remove props not in task table
    delete task["taskActions"];
    delete task["clientFullName"];
    // update task
    const [updatedTask] = await knex("tasks")
      .update(snakeCaseKeys(task))
      .where({ task_id: taskId })
      .returning("*");
    // update task actions
    await batchUpdate(
      "task_actions",
      "task_action_id",
      snakeCaseKeys(taskActions)
    );
    // attach properties not stored in task table
    updatedTask.taskActions = taskActions;
    updatedTask.clientFullName = clientFullName;
    // send back results
    res.status(200).json({ updatedTask, taskId });
  } catch (err) {
    next(err);
  }
}

async function updateTaskLocation(req, res, next) {
  try {
    const taskId = +req.params.taskId;
    const { newColumnId, newIndex } = req.body.taskCard;

    await knex("tasks")
      .update({ task_column_id: newColumnId, task_row_index: newIndex })
      .where({ task_id: taskId });
    res.status(200).json({ taskId, taskCard: req.body.taskCard });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  addTask,
  updatePartialTask,
  updateFullTask,
  updateTaskLocation,
};
