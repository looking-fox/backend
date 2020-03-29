const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("form_fields", table => {
    table
      .increments("form_field_id")
      .unsigned()
      .primary();

    table.string("uid").notNullable();
    table
      .foreign("uid")
      .references("uid")
      .inTable("users");

    table.integer("form_id").notNullable();
    table
      .foreign("form_id")
      .references("form_id")
      .inTable("forms")
      .onDelete("CASCADE");

    table.text("form_field_title").notNullable();
    table.string("form_field_type").notNullable();
    table.text("form_field_description").nullable();
    table.text("form_field_placeholder").nullable();
    table.specificType("form_field_select_options", "text ARRAY").nullable();
    table.specificType("form_field_radio_options", "text ARRAY").nullable();

    table.integer("form_field_order").notNullable();

    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("form_fields"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("form_fields");
};
