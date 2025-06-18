import { useState } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";
import "../styles/backlog.css";

export default function EditTaskModal({ task, onClose, onUpdated }) {
  const [title, setTitle] = useState(task.Title || "");
  const [description, setDescription] = useState(task.Description || "");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : "" // voor <input type="date">
  );
  const [status, setStatus] = useState(task.state?.name || "");

  const statusMap = {
    Backlog: 5,
    "To-do": 6,
    "In progress": 4,
    "Ready for review": 12,
    Done: 8,
  };

  const handleSave = async () => {
    const statusId = statusMap[status];
    const taskUuid = task.documentId;

    const res = await fetch(`${API_URL}/tasks/${taskUuid}`, {
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
          state: statusId,
        },
      }),
    });

    const result = await res.json();

    if (res.ok) {
      console.log("✅ Update gelukt");
      onUpdated();
    } else {
      console.error("❌ Fout bij PUT:", result);
      alert("Fout bij opslaan.");
    }
  };

  return (
    <div className="backlog__modal">
      <div className="backlog__content">
        <button className="backlog__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="backlog__header">Taak bewerken</h2>

        <label>Titel:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

        <button className="backlog__save-button" onClick={handleSave}>Opslaan</button>
      </div>
    </div>
  );
}
