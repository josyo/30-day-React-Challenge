import React from "react";
import type { TaskCardProps } from "../../types/task";

const STATUS_LABELS: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export default function TaskCard({
  task,
  isSelected,
  onSelectTask,
  onDelete,
  onUpdateStatus,
  isUpdatingStatus,
}: TaskCardProps) {
  const isCompleted = task.status === "COMPLETED";

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  const handleQuickCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Completed -> reopen to TODO. Anything else -> mark COMPLETED.
    onUpdateStatus(task, isCompleted ? "TODO" : "COMPLETED");
  };

  return (
    <div
      className={`task-card ${isSelected ? "selected" : ""} ${
        isCompleted ? "completed" : ""
      }`}
      onClick={() => onSelectTask(task)}
      style={{
        border: isSelected
          ? "2px solid var(--primary-color)"
          : "1px solid var(--border-color)",
        opacity: isCompleted ? 0.7 : 1,
      }}
    >
      <div className="task-card-left">
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {STATUS_LABELS[task.status]}
        </span>
        <div className="task-details">
          <h4 style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
            {task.title}
          </h4>
          <span className="task-meta">{task.category.name}</span>
        </div>
      </div>

      <div className="task-card-right">
        <button
          className="quick-complete-btn"
          onClick={handleQuickCompleteClick}
          disabled={isUpdatingStatus}
          aria-label={
            isCompleted
              ? `Reopen task "${task.title}"`
              : `Mark task "${task.title}" as complete`
          }
        >
          {isUpdatingStatus ? "..." : isCompleted ? "↺" : "✓"}
        </button>

        <button
          className="delete-task-btn"
          onClick={handleDeleteClick}
          aria-label={`Delete task "${task.title}"`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}