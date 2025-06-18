import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";
import EditTaskModal from "./EditTaskModal";
import { API_URL, API_TOKEN } from "../constants/constants";

export default function PaginatedBacklog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editingTask, setEditingTask] = useState(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlogTasks", projectId, currentPage, pageSize, refetchKey],
    queryFn: async () => {
      console.log("↪️ Refetching backlog tasks...");
      const res = await fetch(
        `${API_URL}/tasks?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&filters[state][name][$eq]=Backlog&filters[project][id][$eq]=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log("📦 New tasks fetched:", json.data);
      return json;
    },
    keepPreviousData: true,
  });

  if (isLoading) return null;
  if (isError) return <p>Fout bij laden van backlog...</p>;

  const tasks = data.data;
  const pageCount = data.meta.pagination.pageCount;

  const handleDelete = async (task) => {
    const confirmed = confirm(
      `Weet je zeker dat je "${task.Title}" wil verwijderen?`
    );
    if (!confirmed) return;

    const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.ok) {
      console.log("🗑️ Verwijderd:", task.documentId);
      setRefetchKey((k) => k + 1);
    } else {
      alert("Verwijderen mislukt.");
    }
  };

  return (
    <>
      <Backlog
        key={refetchKey}
        tasks={tasks}
        onClose={() => navigate({ to: `/projects/${projectId}` })}
        pagination={
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        }
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDelete}
      />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => {
            console.log("✅ Edit complete, triggering refetch...");
            setEditingTask(null);
            setRefetchKey((k) => k + 1);
          }}
        />
      )}
    </>
  );
}
