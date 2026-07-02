import { useState } from "react";
import EmployeeList from "./components/task-list/TaskList";
import type { Task } from "./types/task";
import "./index.css";
import { TaskDetails } from "./components/task-detail/TaskDetails";

export default function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Directory Overview</h1>
        <p>
          Manage system operations, active records, and connected personnel
          profiles.
        </p>
      </header>

      <main className={`dashboard-grid ${selectedTask ? "has-selection" : ""}`}>
        {/* Primary Operational Section */}
        <div>
          <EmployeeList
            selectedTask={selectedTask}
            onSelectTask={setSelectedTask}
          />
        </div>

        {/* Side Detail Inspection Panel */}
        <TaskDetails value={selectedTask} onChange={setSelectedTask} />
      </main>
    </div>
  );
}
