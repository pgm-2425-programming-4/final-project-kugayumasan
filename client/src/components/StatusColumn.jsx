import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function StatusColumn({ status, project, selectedLabel, searchTerm }) {
  const fetchTasks = async () => {
    const url = `${API_URL}/tasks?filters[state][name][$eq]=${encodeURIComponent(
      status,
    )}&filters[project][$eq]=${project}&populate=*`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Fetch failed:", res.status, errorText);
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", project, status],
    queryFn: fetchTasks,
  });

  const tasks = data?.data || [];

  // ✅ Filtering met veilige checks
  const filteredTasks = tasks
    .filter((task) => task?.attributes)
    .filter((task) => {
      const attrs = task.attributes;
      const title = attrs.Title?.toLowerCase() || "";
      const description = attrs.Description?.toLowerCase() || "";

      const matchesSearch =
        searchTerm === "" ||
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

  console.log("✅ FILTERED TAKEN:", filteredTasks);

  return (
    <div className="status__column">
      <h3 className="status__title">{status}</h3>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading tasks.</p>}
      {!isLoading && !isError && filteredTasks.length === 0 && <p>No tasks</p>}

      {filteredTasks.map((task) => {
        const attrs = task.attributes;
        const labels = attrs.labels?.data || [];

        return (
          <div key={task.id} className="task__card">
            <p>
              <strong>Titel:</strong> {attrs.Title}
            </p>
            <p>
              <strong>Beschrijving:</strong> {attrs.Description || "-"}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {attrs.dueDate
                ? new Date(attrs.dueDate).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {attrs.state?.data?.attributes?.name || "-"}
            </p>
            <p>
              <strong>Labels:</strong>{" "}
              {labels.map((l) => l.attributes.name).join(", ") || "-"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
