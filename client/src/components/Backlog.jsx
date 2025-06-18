import "../styles/backlog.css";

export default function Backlog({
  tasks,
  onClose,
  pagination,
  onEdit,
  onDelete,
}) {
  return (
    <div className="backlog__modal">
      <div className="backlog__content">
        <button className="backlog__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="backlog__header">Backlog Taken</h2>

        <table className="backlog__table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Beschrijving</th>
              <th>Deadline</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.Title}</td>
                <td>{task.Description || "-"}</td>
                <td>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="backlog__edit-button"
                    onClick={() => onEdit(task)}
                  >
                    edit
                  </button>{" "}
                  <button
                    className="backlog__delete-button"
                    onClick={() => onDelete(task)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="backlog__pagination">{pagination}</div>
      </div>
    </div>
  );
}
