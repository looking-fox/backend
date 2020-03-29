const { randomBytes } = require("crypto");
const { promisify } = require("util");

async function generateId(bytes = 8) {
  const randomBytesPromiseified = promisify(randomBytes);
  const generatedId = (await randomBytesPromiseified(bytes)).toString("hex");
  return generatedId;
}

module.exports = { generateId };
