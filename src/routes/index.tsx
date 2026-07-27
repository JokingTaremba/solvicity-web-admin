import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <h1 className="p-8 text-xl font-semibold">Solvicity Admin</h1>;
}
