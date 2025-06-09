
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <h1>Welcome to the Kanban app! Select a project from the menu.</h1>
  );
}
