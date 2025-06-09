import { createFileRoute } from "@tanstack/react-router";
import Backlog from "../../components/Backlog";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: BacklogPage,
});

function BacklogPage() {
  const { projectId } = Route.useParams();
  return <Backlog project={`PGM${projectId}`} />;
}
