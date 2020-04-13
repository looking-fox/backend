async function getTasks(req, res, next) {
  try {
    await console.log("Hit GET endpoint for tasks!");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks };
