const knex = require("../../db/connection");

async function queryForms(userId, formId) {
  const { rows: forms } = await knex.raw(`
    with form_fields as (
    select new_row.form_id, array_agg(row_to_json(new_row)) as form_fields
    from (
        select * from form_fields ff
        where uid = '${userId}'
    ) new_row   
    group by new_row.form_id
    )
        
    select * from forms
    right join form_fields on form_fields.form_id = forms.form_id
    where forms.form_id not in 
        (select forms.form_draft_of from forms 
        where forms.form_draft_of is not null)
    and uid = '${userId}'
    ${formId ? `and forms.form_id = '${formId}'` : ""}
    order by forms.created_at desc;
    `);
  return forms;
}

module.exports = { queryForms };
