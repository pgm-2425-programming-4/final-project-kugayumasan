import "../styles/statusboard.css";
import { StatusColumn } from "./StatusColumn";

export default function StatusBoard({ project }) {
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <div className="status__board">
      {statuses.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          project={project}
        />
      ))}
    </div>
  );
}
