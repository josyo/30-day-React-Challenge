import TaskCard from "./TaskCard";
import "../../index.css"
import type { TaskListProps } from "../../types/task";
import { SearchBar } from "../task-list/SearchBar";
import { AddTaskForm } from "../task-form/TaskForm";
import { useFetchTask, useTaskMutations } from "../../hooks/useTask";
import { useSearch } from "../../hooks/useSearch";

export default function UserList({
  selectedTask,
  onSelectTask,
}: TaskListProps) {
  const { tasks, loading, error, loadTasks } = useFetchTask();
  const {
    addTask,
    deleteTask,
    updateTaskStatus,
    isSubmitting,
    isDeleting,
    isUpdatingStatus,
    mutationError,
  } = useTaskMutations({
    onSuccess: () => {
      loadTasks();
    },
  });

  const { searchTerm, setSearchTerm, filteredTasks } = useSearch(tasks);

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

  return (
    <div className="task-list-container">
      {/* Non-fatal mutation banner: shows errors without destroying the main UI layout */}
      {mutationError && (
        <div className="mutation-error-banner">
          <p>⚠️ Action failed: {mutationError}</p>
        </div>
      )}

      <div className="search-wrapper">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* Main Task List Display */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">No matching tasks found.</div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
              onSelectTask={onSelectTask}
              onDelete={deleteTask} // Injected from our mutation hook
              onUpdateStatus ={updateTaskStatus} // Injected from our mutation hook
              isUpdatingStatus={isUpdatingStatus}
            />
          ))}
        </div>
      )}

      {/* Action Forms and Global Indicators */}
      <AddTaskForm onAddTask={addTask} />

      {(isSubmitting || isDeleting || isUpdatingStatus) && (
        <p className="saving-indicator">
          {isSubmitting && "Saving new task..."}
          {isDeleting && "Deleting task..."}
          {isUpdatingStatus && "Updating task status..."}
        </p>
      )}
    </div>
  );
}
