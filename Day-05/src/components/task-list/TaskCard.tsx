import React from "react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelectTask: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
  onToggle: (task: Task) => Promise<void>;
}

export default function TaskCard({
  task,
  isSelected,
  onSelectTask,
  onDelete,
  onToggle,
}: TaskCardProps) {
  // Prevent card-selection click when hitting action elements
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggle(task);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div
      className={`task-card ${isSelected ? "selected" : ""} ${task.completed ? "completed" : ""}`}
      onClick={() => onSelectTask(task)}
      style={{
        border: isSelected
          ? "2px solid var(--primary-color)"
          : "1px solid var(--border-color)",
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      <div className="task-card-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />
        <div className="task-details">
          <h4
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </h4>
          {/* If your JSONPlaceholder data maps userIds, we can display them here */}
          {task.userId && (
            <span className="task-meta">Assigned to ID: {task.userId}</span>
          )}
        </div>
      </div>

      <div className="task-card-right">
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
