import { useEffect, useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from '../services/taskApi.js';

function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed inset-x-0 top-4 flex justify-center sm:justify-end px-4 sm:px-8 z-50">
      <div
        className={`max-w-sm rounded-2xl border px-4 py-3 shadow-soft text-sm flex items-start gap-3 bg-white ${
          toast.type === 'error'
            ? 'border-rose-200 text-rose-700'
            : 'border-emerald-200 text-emerald-700'
        }`}
      >
        <div className="mt-0.5">
          {toast.type === 'error' ? (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500 text-xs font-semibold">
              !
            </span>
          ) : (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 text-xs font-semibold">
              ✓
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium mb-0.5">{toast.title}</p>
          {toast.message && <p className="text-xs text-slate-500">{toast.message}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-xs text-slate-400 hover:text-slate-600"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortDirection, setSortDirection] = useState('asc');
  const [toast, setToast] = useState(null);

  const showToast = (payload) => {
    setToast({
      id: Date.now(),
      ...payload,
    });
    setTimeout(() => {
      setToast((current) => (current && current.id === payload.id ? null : current));
    }, 3500);
  };

  const handleCloseToast = () => setToast(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
        setToast({
          id: Date.now(),
          type: 'error',
          title: 'Failed to load tasks',
          message: 'Please check your connection or try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (taskInput) => {
    try {
      const created = await createTask(taskInput);
      setTasks((prev) => [created, ...prev]);
      showToast({
        type: 'success',
        title: 'Task created',
        message: 'Your task has been added to the board.',
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Could not create task',
        message: error.response?.data?.message || 'Something went wrong while creating the task.',
      });
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
      showToast({
        type: 'success',
        title: status === 'Completed' ? 'Task completed' : 'Task reopened',
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Could not update task',
        message: error.response?.data?.message || 'Please try again.',
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      showToast({ type: 'success', title: 'Task deleted' });
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Could not delete task',
        message: error.response?.data?.message || 'Please try again.',
      });
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    const statusFiltered =
      statusFilter === 'All'
        ? tasks
        : tasks.filter((task) => task.status === statusFilter);

    const priorityFiltered =
      priorityFilter === 'All'
        ? statusFiltered
        : statusFiltered.filter((task) => task.priority === priorityFilter);

    const sorted = [...priorityFiltered].sort((a, b) => {
      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    });

    return sorted;
  }, [tasks, statusFilter, priorityFilter, sortDirection]);

  return (
    <main className="space-y-6">
      <Toast toast={toast} onClose={handleCloseToast} />
      <TaskForm onCreate={handleCreateTask} />

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-soft p-4 sm:p-6 mt-4">
        {isLoading ? (
          <div className="py-6 text-center text-sm text-slate-500">Loading tasks…</div>
        ) : (
          <TaskList
            tasks={filteredAndSortedTasks}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            sortDirection={sortDirection}
            onStatusFilterChange={setStatusFilter}
            onPriorityFilterChange={setPriorityFilter}
            onSortDirectionChange={setSortDirection}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </main>
  );
}

export default Home;
