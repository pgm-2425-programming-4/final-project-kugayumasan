import { createFileRoute } from "@tanstack/react-router";
import PaginatedBacklog from "../../components/PaginatedBacklog";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: BacklogPage,
});

function BacklogPage() {
  const { projectId } = Route.useParams();

  return <PaginatedBacklog projectId={projectId} />;
}
