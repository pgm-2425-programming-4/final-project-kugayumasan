import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function StatusColumn({ status, project }) {
  const fetchTasksByStatus = async () => {
    const res = await fetch(`${API_URL}/tasks?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
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

      {tasks
        .filter((task) => task?.attributes || task?.Title)
        .map((task) => {
          const attrs = task.attributes || task;

          return (
            <div key={task.id} className="task__card">
              <p>Titel: {attrs.Title}</p>
              <p>Beschrijving: {attrs.Description || "-"}</p>
              <p>
                Deadline:{" "}
                {attrs.dueDate
                  ? new Date(attrs.dueDate).toLocaleDateString()
                  : "-"}
              </p>
              <p>Status: {attrs.state?.data?.attributes?.name || "-"}</p>
            </div>
          );
        })}
    </div>
  );
}
