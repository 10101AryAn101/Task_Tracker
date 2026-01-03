import { format } from 'date-fns';

const priorityStyles = {
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Medium: 'bg-amber-50 text-amber-700 border-amber-100',
  High: 'bg-rose-50 text-rose-700 border-rose-100',
};

const statusStyles = {
  Pending: 'bg-slate-100 text-slate-700 border-slate-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

function TaskCard({ task, onToggleStatus, onDelete }) {
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date() && task.status !== 'Completed';

  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4 sm:p-5 flex flex-col gap-3 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-lg">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-3">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
          >
            {task.priority} priority
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}
          >
            {task.status}
          </span>
        </div>
      </header>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-medium text-slate-600">Due:</span>{' '}
          {dueDate ? format(dueDate, 'dd MMM yyyy') : '—'}
          {isOverdue && (
            <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 border border-rose-100">
              Overdue
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              onToggleStatus(task._id, task.status === 'Completed' ? 'Pending' : 'Completed')
            }
            className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
          >
            {task.status === 'Completed' ? 'Mark as pending' : 'Mark as done'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            className="inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
