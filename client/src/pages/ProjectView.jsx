import { useState } from "react";
import { Route } from "../routes/projects/$projectId"; 
import StatusBoard from "../components/StatusBoard";
import TopBar from "../components/TopBar";

export default function ProjectView() {
  const { projectId } = Route.useParams(); 
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <TopBar
        selectedLabel={selectedLabel}
        onLabelChange={setSelectedLabel}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddTask={() => alert("Add task not implemented")}
        onViewBacklog={() =>
          (window.location.href = `/projects/${projectId}/backlog`)
        }
      />
      <StatusBoard
        projectId={projectId}
        selectedLabel={selectedLabel}
        searchTerm={searchTerm}
      />
    </>
  );
}
