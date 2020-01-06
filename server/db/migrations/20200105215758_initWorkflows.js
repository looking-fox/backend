const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("workflows", table => {
    table
      .increments("wf_id")
      .unsigned()
      .primary();
    table.string("uid").notNullable();
    table
      .foreign("uid")
      .references("uid")
      .inTable("users");
    table.string("wf_name").notNullable();
    table.string("wf_tag_color").notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("workflows"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("workflows");
};
