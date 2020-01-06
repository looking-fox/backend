const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("actions", table => {
    table
      .increments("wf_action_id")
      .unsigned()
      .primary();
    table.string("uid").notNullable();
    table
      .foreign("uid")
      .references("uid")
      .inTable("users");
    table.integer("wf_id").notNullable();
    table
      .foreign("wf_id")
      .references("wf_id")
      .inTable("workflows")
      .onDelete("CASCADE");
    table.string("wf_action_name").notNullable();
    table.string("wf_action_type").notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("actions"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("actions");
};
