const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("clients", table => {
    table
      .increments("client_id")
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
      .inTable("workflows");
    table.string("client_full_name").notNullable();
    table.string("client_email").nullable();
    table.string("client_phone").nullable();
    table.timestamp("client_date").nullable();
    table.string("client_location").nullable();
    table.text("client_private_note").nullable();
    table
      .integer("current_wf_index")
      .notNullable()
      .defaultTo(0);
    table
      .boolean("client_archived")
      .notNullable()
      .defaultTo(false);
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("clients"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("clients");
};
