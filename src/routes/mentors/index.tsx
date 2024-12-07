import { MentorsPage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentors/")({
  component: MentorsPage,
});
