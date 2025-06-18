import { useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";
import "../styles/modal.css";

export default function AddTaskModal({ onClose, onTaskCreated, projectId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [label, setLabel] = useState("");
  const [availableLabels, setAvailableLabels] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projectId || "");
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    async function fetchStatuses() {
      const res = await fetch(`${API_URL}/statuses`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
      setAvailableStatuses(json.data || []);
    }

    async function fetchLabels() {
      const res = await fetch(`${API_URL}/labels`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
      setAvailableLabels(json.data || []);
    }

    async function fetchProjects() {
      const res = await fetch(`${API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
      setAvailableProjects(json.data || []);
    }

    fetchStatuses();
    fetchLabels();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      Title: title,
      Description: description,
      project: selectedProject,
      state: status,
      labels: label ? [{ id: label }] : [],
    };

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ data: newTask }),
      });

      const json = await res.json();
      console.log("✅ Created task:", json);

      if (res.ok) {
        onTaskCreated();
        onClose();
      } else {
        console.error("❌ Failed to create task:", json.error);
        alert("Failed to create task: " + json.error?.message);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error occurred.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal__form">
        <h2 className="modal__title">Add New Task</h2>

        <input
          type="text"
          className="modal__input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="modal__textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="modal__select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          required
        >
          <option value="">-- Select Project --</option>
          {availableProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.attributes?.title || p.title}
            </option>
          ))}
        </select>

        <select
          className="modal__select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">-- Select Status --</option>
          {availableStatuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.attributes?.name || s.name}
            </option>
          ))}
        </select>

        <select
          className="modal__select"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        >
          <option value="">-- Select Label --</option>
          {availableLabels.map((l) => (
            <option key={l.id} value={l.id}>
              {l.attributes?.label || l.label}
            </option>
          ))}
        </select>

        <div className="modal__buttons">
          <button
            type="submit"
            className="modal__button modal__button--primary"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="modal__button modal__button--secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
