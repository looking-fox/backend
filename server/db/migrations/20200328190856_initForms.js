const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("forms", table => {
    table
      .increments("form_id")
      .unsigned()
      .primary();
    table.string("form_link").notNullable();
    table.string("uid").notNullable();
    table
      .foreign("uid")
      .references("uid")
      .inTable("users");

    table.string("form_title").notNullable();

    table
      .boolean("form_active")
      .notNullable()
      .defaultTo(false);
    table.integer("form_draft_of").nullable();
    table
      .foreign("form_id")
      .references("form_id")
      .inTable("forms");

    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("forms"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("forms");
};
