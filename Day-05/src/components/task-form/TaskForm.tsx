import type { AddTaskFormProps } from "../types/task";
import { useState } from "react";

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !summary || !reporterEmail) {
      return setError("Title, summary, and reporter email are required");
    }

    onAddTask({
      title,
      summary,
      reporterEmail,
      contactPhone,
      referenceUrl: "",
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
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Create Task</h3>

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