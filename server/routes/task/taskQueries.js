const knex = require("../../db/connection");

async function queryTasks(userId) {
  const { rows: tasks } = await knex.raw(`
  with tasks as (
    select new_row.task_column_id, array_agg(row_to_json(new_row)) as tasks
    from ( 
        select * from tasks
        where uid = '${userId}'
    ) new_row   
    group by new_row.task_column_id
  )

    select tc.task_column_id, uid, task_column_name, task_column_order, 
    coalesce(tasks, '{}') as tasks
    from task_columns tc
    left join tasks on tasks.task_column_id = tc.task_column_id
    order by task_column_order;
  `);
  return tasks;
}

module.exports = { queryTasks };
