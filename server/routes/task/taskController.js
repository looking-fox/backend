const { queryTasks } = require("./taskQueries");

async function getTasks(req, res, next) {
  try {
    const tasks = await queryTasks(req.userId);
    console.log(req.userId);
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks };
