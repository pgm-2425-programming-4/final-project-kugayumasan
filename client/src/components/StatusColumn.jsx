import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function StatusColumn({ status, project }) {
  const fetchTasksByStatus = async () => {
    const res = await fetch(
      `${API_URL}/tasks?filters[state][name][$eq]=${status}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return res.json(); // ⬅️ gewoon response teruggeven zonder mappen
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", project, status],
    queryFn: fetchTasksByStatus,
  });

  const tasks = data?.data || [];

  return (
    <div className="status__column">
      <h3 className="status__title">{status}</h3>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading tasks.</p>}
      {tasks.length === 0 && <p>No tasks</p>}

      {tasks.map((task) => (
        <div key={task.id} className="task__card">
          <p>
            Titel: {task.attributes.Title}
          </p>
          <p>
            Beschrijving: {task.attributes.Description || "-"}
          </p>
          <p>
            Deadline:{" "}
            {task.attributes.dueDate
              ? new Date(task.attributes.dueDate).toLocaleDateString()
              : "-"}
          </p>
          <p>
            Status:{" "}
            {task.attributes.state?.data?.attributes?.name || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}
