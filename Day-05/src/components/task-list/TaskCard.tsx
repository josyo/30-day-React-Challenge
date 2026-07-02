import React from "react";
import type { TaskCardProps } from "../../types/task";

const STATUS_LABELS: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const STATUS_BAR_COLOR: Record<string, string> = {
  TODO: "bg-status-todo",
  IN_PROGRESS: "bg-status-in-progress",
  COMPLETED: "bg-status-completed",
};

const STATUS_BADGE_CLASSES: Record<string, string> = {
  TODO: "bg-status-todo-bg text-status-todo",
  IN_PROGRESS: "bg-status-in-progress-bg text-status-in-progress",
  COMPLETED: "bg-status-completed-bg text-status-completed",
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
    onUpdateStatus(task, isCompleted ? "TODO" : "COMPLETED");
  };

  return (
    <div
      onClick={() => onSelectTask(task)}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md ${
        isSelected ? "border-primary ring-2 ring-ring/40" : "border-border"
      }`}
    >
      <div className={`h-1 w-full ${STATUS_BAR_COLOR[task.status]}`} />

      <div className={`p-4 ${isCompleted ? "opacity-60" : ""}`}>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE_CLASSES[task.status]}`}
        >
          {STATUS_LABELS[task.status]}
        </span>

        <h4
          className={`mt-2 text-sm font-semibold leading-snug ${
            isCompleted ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {task.title}
        </h4>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {task.category.name}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
            {task.assignees[0]?.[0] ?? "?"}
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={handleQuickCompleteClick}
              disabled={isUpdatingStatus}
              aria-label={
                isCompleted
                  ? `Reopen task "${task.title}"`
                  : `Mark task "${task.title}" as complete`
              }
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-status-completed-bg hover:text-status-completed disabled:opacity-50"
            >
              {isUpdatingStatus ? "…" : isCompleted ? "↺" : "✓"}
            </button>
            <button
              onClick={handleDeleteClick}
              aria-label={`Delete task "${task.title}"`}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}