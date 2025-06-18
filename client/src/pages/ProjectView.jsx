import { useState } from "react";
import { Route } from "../routes/projects/$projectId";
import { useNavigate } from "@tanstack/react-router";
import StatusBoard from "../components/StatusBoard";
import TopBar from "../components/TopBar";
import AddTaskModal from "../components/AddTaskModal";

export default function ProjectView() {
  const { projectId } = Route.useParams();
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);


  const navigate = useNavigate();

  return (
    <>
      <TopBar
        selectedLabel={selectedLabel}
        onLabelChange={setSelectedLabel}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddTask={() => setShowAddModal(true)}
        onViewBacklog={() => navigate({ to: `/projects/${projectId}/backlog` })}
      />

      <StatusBoard
        projectId={projectId}
        selectedLabel={selectedLabel}
        searchTerm={searchTerm}
        refetchKey={refetchKey}
      />

      {showAddModal && (
        <AddTaskModal
          projectId={projectId}
          onClose={() => setShowAddModal(false)}
          onTaskCreated={() => {
            setRefetchKey((k) => k + 1); // 👈 trigger refresh
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
}
