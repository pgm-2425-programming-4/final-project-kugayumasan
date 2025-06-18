import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Route } from "@tanstack/react-router";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";
import { API_TOKEN, API_URL } from "../constants/constants";

export default function PaginatedBacklog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlogTasks", projectId, currentPage, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/tasks?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&filters[state][name][$eq]=Backlog&filters[project][id][$eq]=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return res.json();
    },
    keepPreviousData: true,
  });

  if (isLoading) return null;
  if (isError) return <p>Error loading backlog...</p>;

  const tasks = data.data;
  const pageCount = data.meta.pagination.pageCount;

  return (
    <Backlog
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
    />
  );
}
