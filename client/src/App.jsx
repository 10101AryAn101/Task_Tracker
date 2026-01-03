import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Task Tracker</h1>
            <p className="mt-1 text-sm text-slate-500">
              Stay on top of your work with priorities, due dates, and a clean dashboard.
            </p>
          </div>
        </header>
        <Home />
      </div>
    </div>
  );
}

export default App;
