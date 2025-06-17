import { useState } from "react";
import { Route } from "../routes/projects/$projectId";
import { useNavigate } from "@tanstack/react-router";
import StatusBoard from "../components/StatusBoard";
import TopBar from "../components/TopBar";

export default function ProjectView() {
  const { projectId } = Route.useParams();
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        selectedLabel={selectedLabel}
        onLabelChange={setSelectedLabel}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddTask={() => alert("Add task not implemented")}
        onViewBacklog={() => navigate({ to: `/projects/${projectId}/backlog` })}
      />
      <StatusBoard
        projectId={projectId}
        selectedLabel={selectedLabel}
        searchTerm={searchTerm}
      />
    </>
  );
}
