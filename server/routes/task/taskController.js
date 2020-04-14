const knex = require("../../db/connection");
const snakeCaseKeys = require("snakecase-keys");
const { queryTasks } = require("./taskQueries");

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
    const { columnId } = req.body;
    const [newTask] = await knex("tasks")
      .insert({ uid: req.userId, task_column_id: columnId })
      .returning("*");
    newTask.isNew = true;
    res.status(200).json({ newTask, columnId });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { task } = req.body;
    const taskId = +req.params.taskId;
    const [updatedTask] = await knex("tasks")
      .update(snakeCaseKeys(task))
      .where({ task_id: taskId })
      .returning("*");
    res.status(200).json({ updatedTask, taskId });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks, addTask, updateTask };
