// client/src/components/Backlog.jsx
export default function Backlog({ tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Titel</th>
          <th>Beschrijving</th>
          <th>Deadline</th>
          <th>Status</th>
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
            <td>{task.state?.name || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
