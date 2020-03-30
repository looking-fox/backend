const knex = require("../../db/connection");

async function queryForms(userId) {
  const { rows: forms } = await knex.raw(`
    with form_fields as (
    select new_row.form_id, array_agg(row_to_json(new_row)) as form_fields_agg
    from (
        select * from form_fields ff
        where uid = '${userId}'
    ) new_row   
    group by new_row.form_id
    )
        
    select * from forms
    right join form_fields on form_fields.form_id = forms.form_id
    where uid = '${userId}';  
    `);
  return forms;
}

module.exports = { queryForms };
