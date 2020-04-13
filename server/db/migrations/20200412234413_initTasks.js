const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function (knex, Promise) {
  await knex.schema.createTable("tasks", (table) => {
    table.increments("task_id").unsigned().primary();

    table.string("uid").notNullable();
    table.foreign("uid").references("uid").inTable("users");

    table.integer("client_id").nullable();
    table.foreign("client_id").references("client_id").inTable("clients");

    table.integer("task_column_id").notNullable();
    table
      .foreign("task_column_id")
      .references("task_column_id")
      .inTable("task_columns");

    table.string("task_title").nullable();
    table.string("task_priority").nullable();
    table.text("task_notes").nullable();
    table.timestamp("task_due_date").nullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("tasks"));
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("tasks");
};
