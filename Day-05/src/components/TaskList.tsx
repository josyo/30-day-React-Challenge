import EmployeeCard from "./TaskCard";

import "./../App.css";
import type { TaskListProps } from "../types/task";
import { SearchBar } from "./SearchBar";
import { AddTaskForm } from "./TaskForm";
import { useFetchTask, useAddTask } from "../hooks/useTask";
import { useSearch } from "../hooks/useSearch";

export default function UserList({
  selectedTask,
  onSelectTask,
}: TaskListProps) {
  const { employees, loading, error, loadTasks } = useFetchTask();
  const { addTask, isSubmitting, submitError } = useAddTask({
    onSuccess: (newTask) => {
      loadTasks();
    },
  });

  const { searchTerm, setSearchTerm, filteredTasks } = useSearch(employees);

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p style={{ color: "var(--text-muted)", margin: 0 }}>
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container">
        <p className="error-text">{error}</p>
        <button className="retry-btn" onClick={loadTasks}>
          Try Again
        </button>
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="state-container">
        <p className="error-text">{error}</p>
        <button className="retry-btn" onClick={loadTasks}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="search-wrapper">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">No matching team members found.</div>
      ) : (
        filteredTasks.map((employee) => (
          <EmployeeCard
            key={employee.id}
            task={employee}
            isSelected={selectedTask?.id === employee.id}
            onSelectTask={onSelectTask}
          />
        ))
      )}

      <AddTaskForm onAddTask={addTask} />

      {isSubmitting && (
        <p className="saving-indicator">Saving new employee...</p>
      )}
    </div>
  );
}
