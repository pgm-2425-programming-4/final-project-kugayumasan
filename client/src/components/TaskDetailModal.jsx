import { useState } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";
import "../styles/backlog.css";

export default function TaskDetailModal({ task, onClose, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.Title || "");
  const [description, setDescription] = useState(task.Description || "");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : ""
  );
  const [status, setStatus] = useState(task.state?.name || "");

  const statusMap = {
    Backlog: 5,
    "To-do": 6,
    "In progress": 4,
    "Ready for review": 12,
    Done: 8,
  };

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Title: title,
          Description: description,
          dueDate: dueDate || null,
          state: statusMap[status],
        },
      }),
    });

    if (res.ok) {
      console.log("✅ Task updated");
      onUpdated();
    } else {
      const err = await res.json();
      console.error("❌ Update failed:", err);
      alert("Fout bij opslaan.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Weet je zeker dat je deze taak wilt verwijderen?"
    );
    if (!confirm) return;

    const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.ok) {
      console.log("🗑️ Task deleted");
      onUpdated();
    } else {
      const err = await res.json();
      console.error("❌ Delete failed:", err);
      alert("Fout bij verwijderen.");
    }
  };

  return (
    <div className="backlog__modal">
      <div className="backlog__content">
        <button className="backlog__close" onClick={onClose}>
          &times;
        </button>

        {isEditing ? (
          <>
            <h2 className="backlog__header">Taak bewerken</h2>

            <label>Titel:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Beschrijving:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Deadline:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Backlog">Backlog</option>
              <option value="To-do">To-do</option>
              <option value="In progress">In progress</option>
              <option value="Ready for review">Ready for review</option>
              <option value="Done">Done</option>
            </select>

            <button className="backlog__save-button" onClick={handleUpdate}>
              Opslaan
            </button>
          </>
        ) : (
          <>
            <h2 className="backlog__header">Taakdetails</h2>
            <p>
              <strong>Titel:</strong> {task.Title}
            </p>
            <p>
              <strong>Beschrijving:</strong> {task.Description || "Geen"}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Geen"}
            </p>
            <p>
              <strong>Status:</strong> {task.state?.name || "Onbekend"}
            </p>
            <div>
              <button
                className="backlog__edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="backlog__delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
