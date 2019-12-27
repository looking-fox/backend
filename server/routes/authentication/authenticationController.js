async function login(req, res, next) {
  try {
    await console.log("Logging in...");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login
};
