import "./../App.css";
import type { TaskCardProps } from "../types/task";

export default function TaskCard({
  task,
  isSelected,
  onSelectTask,
}: TaskCardProps) {
  return (
    <div
      className={`user-card ${isSelected ? "is-active" : ""}`}
      onClick={() => onSelectTask(task)}
    >
      <div className="user-info">
        <h3>{task.title}</h3>
        <div className="user-meta">
          <span>{task.summary}</span>
        </div>
      </div>
      <button className="view-btn">{isSelected ? "Viewing" : "Details"}</button>
    </div>
  );
}
