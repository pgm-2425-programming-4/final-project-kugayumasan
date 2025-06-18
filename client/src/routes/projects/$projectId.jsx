import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import ProjectView from "../../pages/ProjectView";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectWrapper,
});

function ProjectWrapper() {
  return (
    <>
      <ProjectView />
      <Outlet /> {/* 👈 Zorg dat nested routes kunnen renderen */}
    </>
  );
}
