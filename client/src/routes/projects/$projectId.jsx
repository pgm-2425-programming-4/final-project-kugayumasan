import { createFileRoute } from "@tanstack/react-router";
import ProjectView from "../../pages/ProjectView";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectView,
});
