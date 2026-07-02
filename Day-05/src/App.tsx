import { useState } from "react";
import { LayoutDashboard, FolderKanban, ListTodo, Calendar, Clock, Settings, Search } from "lucide-react";
import EmployeeList from "./components/task-list/TaskList";
import type { Task } from "./types/task";
import "./index.css";
import { TaskDetailModal } from "./components/task-detail/TaskDetailModal";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "My Tasks", icon: ListTodo, active: false },
  { label: "Calendar", icon: Calendar, active: false },
  { label: "Time Tracking", icon: Clock, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-56 flex-col border-r border-border bg-card px-3 py-6">
        <div className="mb-8 flex items-center gap-2 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm">
            T
          </div>
          <span className="font-heading text-sm font-bold">Task Dashboard</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) =>
            active ? (
              <button
                key={label}
                className="flex items-center gap-3 rounded-lg border-l-[3px] border-primary bg-primary-soft px-3 py-2 text-sm font-semibold text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ) : (
              <button
                key={label}
                disabled
                title="Coming soon"
                className="group flex items-center justify-between rounded-lg border-l-[3px] border-transparent px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <span className="hidden rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground group-hover:inline-block">
                  Soon
                </span>
              </button>
            )
          )}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search tasks..."
              disabled
              title="Use the search bar below the task list for now"
              className="w-full rounded-lg border border-input bg-background py-1.5 pl-9 pr-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
            />
          </div>
        </header>

        <main className="max-w-[1160px] w-full mx-auto px-6 py-6">
          <EmployeeList
            selectedTask={selectedTask}
            onSelectTask={setSelectedTask}
          />
        </main>
      </div>

      <TaskDetailModal value={selectedTask} onChange={setSelectedTask} />
    </div>
  );
}