const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function (knex, Promise) {
  await knex.schema.createTable("task_actions", (table) => {
    table.increments("task_action_id").unsigned().primary();

    table.string("uid").notNullable();
    table.foreign("uid").references("uid").inTable("users");

    table.integer("task_id").notNullable();
    table.foreign("task_id").references("task_id").inTable("tasks");

    table.string("task_action_name").notNullable();
    table.boolean("task_completed").notNullable().defaultTo(false);

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("task_actions"));
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("task_actions");
};
