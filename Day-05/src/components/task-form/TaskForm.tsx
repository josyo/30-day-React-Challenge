import type { AddTaskFormProps, Task } from "../../types/task";
import { useState } from "react";
import { TEAM_MEMBERS } from "../../constants/teamMembers";

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [priority, setPriority] = useState<Task["priority"]>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [assignees, setAssignees] = useState<string[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [subtaskTitles, setSubtaskTitles] = useState<string[]>([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddSubtask = () => {
    const trimmed = subtaskInput.trim();
    if (trimmed) {
      setSubtaskTitles([...subtaskTitles, trimmed]);
    }
    setSubtaskInput("");
  };

  const handleSubtaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubtask();
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtaskTitles(subtaskTitles.filter((_, i) => i !== index));
  };

  const handleAssigneeToggle = (name: string) => {
    setAssignees((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !summary || !reporterEmail) {
      setError("Title, summary, and reporter email are required");
      return;
    }

    onAddTask({
      title,
      summary,
      reporterEmail,
      contactPhone,
      referenceUrl: "",
      status: "TODO",
      priority,
      dueDate,
      tags,
      estimatedHours: estimatedHours === "" ? 0 : Number(estimatedHours),
      trackedHours: 0,
      assignees,
      subtasks: subtaskTitles.map((subtaskTitle) => ({
        id: crypto.randomUUID(),
        title: subtaskTitle,
        done: false,
      })),
      activity: [
        {
          id: crypto.randomUUID(),
          message: "Task created",
          timestamp: new Date().toISOString(),
        },
      ],
      location: {
        room: "",
        floor: "",
        building,
        zoneCode: "",
        coordinates: { lat: "0", lng: "0" },
      },
      category: {
        name: categoryName,
        focusArea: "",
        billingCode: "",
      },
    });

    setTitle("");
    setSummary("");
    setReporterEmail("");
    setContactPhone("");
    setBuilding("");
    setCategoryName("");
    setPriority("MEDIUM");
    setDueDate("");
    setEstimatedHours("");
    setAssignees([]);
    setTags([]);
    setTagInput("");
    setSubtaskTitles([]);
    setSubtaskInput("");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Create Task</h3>

        {error && <p className="form-error">{error}</p>}

        <div className="form-body">
          <div className="form-group">
            <label>Task Title</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Fix Server Room AC"
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <input
              className="form-input"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Unit B is leaking and overheating..."
            />
          </div>

          <div className="form-group">
            <label>Reporter Email</label>
            <input
              className="form-input"
              type="email"
              value={reporterEmail}
              onChange={(e) => setReporterEmail(e.target.value)}
              placeholder="reporter@company.com"
            />
          </div>

          <div className="form-group">
            <label>
              Contact Phone{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <input
              className="form-input"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="1-800-000-0000"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              className="form-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Due Date{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <input
              className="form-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Estimated Hours{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <input
              className="form-input"
              type="number"
              min="0"
              step="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              placeholder="4"
            />
          </div>

          <div className="form-group">
            <label>
              Tags{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional, press Enter to add)
              </span>
            </label>
            <input
              className="form-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Maintenance"
            />
            {tags.length > 0 && (
              <div className="tag-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      aria-label={`Remove tag ${tag}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              Assignees{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <div className="assignee-checkbox-list">
              {TEAM_MEMBERS.map((member) => (
                <label key={member.id} className="assignee-checkbox">
                  <input
                    type="checkbox"
                    checked={assignees.includes(member.name)}
                    onChange={() => handleAssigneeToggle(member.name)}
                  />
                  {member.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              Subtasks{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional, press Enter to add)
              </span>
            </label>
            <input
              className="form-input"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={handleSubtaskKeyDown}
              placeholder="Order replacement part"
            />
            {subtaskTitles.length > 0 && (
              <ul className="subtask-preview-list">
                {subtaskTitles.map((subtaskTitle, index) => (
                  <li key={`${subtaskTitle}-${index}`}>
                    {subtaskTitle}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(index)}
                      aria-label={`Remove subtask ${subtaskTitle}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>
              Building{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <input
              className="form-input"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="HQ North Tower"
            />
          </div>

          <div className="form-group">
            <label>
              Category{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <input
              className="form-input"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Maintenance"
            />
          </div>
        </div>
        <button className="form-submit" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
}