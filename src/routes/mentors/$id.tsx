import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/mentors/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { id } = useParams();
  return <div>Hello "/mentors/$id"!</div>;
}
