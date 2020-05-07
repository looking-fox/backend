const knex = require("../../db/connection");

async function queryTasks(userId) {
  const { rows: task_columns } = await knex.raw(`
  with task_actions as (
    select new_row.task_id, array_agg(row_to_json(new_row)) as task_actions
    from (
        select * from task_actions
        where uid = '${userId}'
    ) new_row
    group by new_row.task_id
    ),

   tasks as (
    select new_row.task_column_id, array_agg(row_to_json(new_row)) as tasks
    from ( 
        select tasks.task_id, tasks.task_column_id, tasks.task_row_index, tasks.task_title,
        tasks.task_priority, tasks.task_notes, tasks.task_due_date, 
        coalesce(task_actions, '{}') as task_actions, tasks.client_id, clients.client_full_name
        from tasks
        left join task_actions ta on ta.task_id = tasks.task_id
        left join clients on clients.client_id = tasks.client_id
        where tasks.uid = '${userId}'
        order by tasks.task_row_index;
    ) new_row   
    group by new_row.task_column_id
   )

   select tc.task_column_id, uid, task_column_name, task_column_order, 
   coalesce(tasks, '{}') as tasks
   from task_columns tc
   left join tasks on tasks.task_column_id = tc.task_column_id
   order by task_column_order;
  `);
  return task_columns;
}

module.exports = { queryTasks };
