import "../styles/statusboard.css";
import { StatusColumn } from "./StatusColumn";

export default function StatusBoard({ projectId, selectedLabel, searchTerm, refetchKey }) {
  const statuses = ["To-do", "In progress", "Ready for review", "Done"];

  return (
    <div className="status__board">
      {statuses.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          projectId={projectId}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          refetchKey={refetchKey}
        />
      ))}
    </div>
  );
}
