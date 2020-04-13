const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function (knex, Promise) {
  await knex.schema.createTable("task_columns", (table) => {
    table.increments("task_column_id").unsigned().primary();

    table.string("uid").notNullable();
    table.foreign("uid").references("uid").inTable("users");

    table.string("task_column_name").notNullable();
    table.integer("task_column_order").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("task_columns"));
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("task_columns");
};
