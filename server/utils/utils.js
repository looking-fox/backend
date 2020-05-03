const { randomBytes } = require("crypto");
const { promisify } = require("util");
const knex = require("../db/connection");

async function generateId(bytes = 8) {
  const randomBytesPromiseified = promisify(randomBytes);
  const generatedId = (await randomBytesPromiseified(bytes)).toString("hex");
  return generatedId;
}

function batchUpdate(table, id, collection) {
  return knex.transaction((trx) => {
    const queries = collection.map((tuple) =>
      knex(table)
        .where(`${id}`, tuple[id])
        .update(tuple)
        .transacting(trx)
        .returning(id)
    );
    return Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });
}

module.exports = { generateId, batchUpdate };
