import { SignUpPage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});
