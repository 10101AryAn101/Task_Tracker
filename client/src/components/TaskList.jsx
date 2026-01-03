import TaskCard from './TaskCard.jsx';

const statusFilterOptions = ['All', 'Pending', 'Completed'];
const priorityFilterOptions = ['All', 'Low', 'Medium', 'High'];

function TaskList({
  tasks,
  statusFilter,
  priorityFilter,
  sortDirection,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSortDirectionChange,
  onToggleStatus,
  onDelete,
}) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Tasks
        </h2>
        <div className="flex flex-wrap gap-2 text-xs sm:text-[13px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
          >
            {statusFilterOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All statuses' : option}
              </option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
          >
            {priorityFilterOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All priorities' : `${option} priority`}
              </option>
            ))}
          </select>
          <select
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
          >
            <option value="asc">Due date ↑ (soonest first)</option>
            <option value="desc">Due date ↓ (latest first)</option>
          </select>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-600 mb-1">
            You have no tasks yet.
          </p>
          <p className="text-xs text-slate-500">
            Create your first task to start tracking your work.
          </p>
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
