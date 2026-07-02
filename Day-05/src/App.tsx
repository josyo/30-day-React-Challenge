import { useState } from "react";
import EmployeeList from "./components/task-list/TaskList";
import type { Task } from "./types/task";
import "./index.css";
import { TaskDetailModal } from "./components/task-detail/TaskDetailModal";

export default function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Task Dashboard</h1>
        <p>Track, update, and manage your team's active tasks.</p>
      </header>

      <main className="dashboard-grid">
        <EmployeeList
          selectedTask={selectedTask}
          onSelectTask={setSelectedTask}
        />
      </main>

      <TaskDetailModal value={selectedTask} onChange={setSelectedTask} />
    </div>
  );
}