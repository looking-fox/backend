const databaseName = "looking_fox_db";

require("dotenv").config({
  path: "production.env"
});
const path = require("path");
module.exports = {
  development: {
    client: "postgresql",
    connection: `postgres://localhost:5432/${databaseName}`,
    migrations: {
      directory: path.join(__dirname, "/server/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/server/db/seeds")
    },
    debug: false,
    asyncStackTraces: true
  },
  staging: {
    client: "postgresql",
    connection: {
      host: process.env.STAGING_DB_HOST,
      database: "postgres",
      port: 5432,
      user: process.env.STAGING_DB_USER,
      password: process.env.STAGING_DB_PASS,
      ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "/server/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/server/db/seeds")
    }
  },
  test: {
    client: "postgresql",
    connection: `postgres://localhost:5432/${databaseName}_test`,
    migrations: {
      directory: path.join(__dirname, "/server/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/server/db/seeds")
    }
  }
};
