const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", table => {
    table
      .increments("user_id")
      .unsigned()
      .primary();
    table
      .string("uid")
      .unique()
      .notNullable();
    table.string("display_name").nullable();
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("profile_photo_url").nullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
  });
  await knex.raw(onUpdateTrigger("users"));
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("users");
};
